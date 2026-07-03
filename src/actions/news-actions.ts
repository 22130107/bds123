"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { generateSlug } from "../lib/slugify";
import sharp from "sharp";

export async function getNews(status?: string) {
  let query = 'SELECT * FROM news';
  const values: any[] = [];
  if (status) {
    query += ' WHERE status = ?';
    values.push(status);
  }
  query += ' ORDER BY createdAt DESC';
  const [rows] = await pool.query(query, values);
  return rows as any[];
}

export async function getNewsPaginated(params?: { search?: string, date?: string, page?: number, limit?: number, status?: string }) {
  let where = '1=1';
  const values: any[] = [];
  
  if (params?.status) {
    where += ' AND status = ?';
    values.push(params.status);
  }
  
  if (params?.search) {
    where += ' AND (title LIKE ? OR excerpt LIKE ?)';
    values.push(`%${params.search}%`, `%${params.search}%`);
  }
  if (params?.date) {
    // Check if date is in YYYY-MM-DD
    const parts = params.date.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      const dInt = parseInt(d, 10).toString();
      const mInt = parseInt(m, 10).toString();
      
      const format1 = `${d}/${m}/${y}`;
      const format2 = `${d}.${m}.${y}`;
      const format3 = `${d}-${m}-${y}`;
      const format4 = `${dInt}/${mInt}/${y}`;
      const format5 = `${dInt}.${mInt}.${y}`;
      const format6 = `${dInt}-${mInt}-${y}`;
      
      where += ' AND (date LIKE ? OR date LIKE ? OR date LIKE ? OR date LIKE ? OR date LIKE ? OR date LIKE ?)';
      values.push(`%${format1}%`, `%${format2}%`, `%${format3}%`, `%${format4}%`, `%${format5}%`, `%${format6}%`);
    } else {
      where += ' AND date LIKE ?';
      values.push(`%${params.date}%`);
    }
  }

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const offset = (page - 1) * limit;

  const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM news WHERE ${where}`, values);
  const total = (countRows as any)[0].total;

  const query = `SELECT * FROM news WHERE ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  const [rows] = await pool.query(query, [...values, limit, offset]);
  
  return { data: rows as any[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getNewsById(id: number) {
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
  return (rows as any[])[0];
}

export async function getNewsBySlug(slug: string) {
  // Thử tìm theo slug trước
  const [rows] = await pool.query('SELECT * FROM news WHERE slug = ?', [slug]);
  const result = (rows as any[])[0];
  if (result) return result;

  // Fallback: nếu slug là số, tìm theo id (backward compatibility cho bài cũ)
  const id = parseInt(slug, 10);
  if (!isNaN(id)) {
    const [idRows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    return (idRows as any[])[0];
  }

  return null;
}

async function ensureUniqueSlug(slug: string, excludeId?: number): Promise<string> {
  let candidate = slug;
  let counter = 2;
  while (true) {
    let query = 'SELECT id FROM news WHERE slug = ?';
    const values: any[] = [candidate];
    if (excludeId) {
      query += ' AND id != ?';
      values.push(excludeId);
    }
    const [rows] = await pool.query(query, values);
    if ((rows as any[]).length === 0) return candidate;
    candidate = `${slug}-${counter}`;
    counter++;
  }
}

async function handleUploads(formData: FormData): Promise<string[]> {
  const uploadDir = join(process.cwd(), ".uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const files = formData.getAll("imageFiles") as File[];
  const uploadedPaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}.webp`;
      const filepath = join(uploadDir, filename);
      
      await sharp(buffer)
        .webp({ quality: 80, lossless: false })
        .toFile(filepath);
        
      uploadedPaths.push(`/api/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createNews(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt');
  const meta_description = formData.get('meta_description') || '';
  const content = formData.get('content');
  const schema_markup = formData.get('schema_markup') || '';
  const img = formData.get('img');
  const category = formData.get('category');
  const date = formData.get('date');
  const status = formData.get('status') || 'published';

  // Slug: dùng giá trị user nhập hoặc sinh tự động từ title
  let slug = (formData.get('slug') as string || '').trim();
  if (!slug) {
    slug = generateSlug(title);
  } else {
    slug = generateSlug(slug);
  }
  slug = await ensureUniqueSlug(slug);

  const newUploads = await handleUploads(formData);
  const finalImg = newUploads.length > 0 ? newUploads[0] : (img || '');

  const [result] = await pool.query(
    'INSERT INTO news (title, slug, excerpt, meta_description, content, schema_markup, img, category, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, slug, excerpt, meta_description, content, schema_markup, finalImg, category, date, status]
  );
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
  return { success: true };
}

export async function updateNews(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt');
  const meta_description = formData.get('meta_description') || '';
  const content = formData.get('content');
  const schema_markup = formData.get('schema_markup') || '';
  const img = formData.get('img');
  const category = formData.get('category');
  const date = formData.get('date');
  const status = formData.get('status') || 'published';

  // Slug: dùng giá trị user nhập hoặc sinh tự động từ title
  let slug = (formData.get('slug') as string || '').trim();
  if (!slug) {
    slug = generateSlug(title);
  } else {
    slug = generateSlug(slug);
  }
  slug = await ensureUniqueSlug(slug, id);

  const newUploads = await handleUploads(formData);
  const finalImg = newUploads.length > 0 ? newUploads[0] : (img || '');

  const [result] = await pool.query(
    'UPDATE news SET title = ?, slug = ?, excerpt = ?, meta_description = ?, content = ?, schema_markup = ?, img = ?, category = ?, date = ?, status = ? WHERE id = ?',
    [title, slug, excerpt, meta_description, content, schema_markup, finalImg, category, date, status, id]
  );
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
  return { success: true };
}

export async function deleteNews(id: number) {
  const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
  return { success: true };
}

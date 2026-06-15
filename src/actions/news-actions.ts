"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function getNews() {
  const [rows] = await pool.query('SELECT * FROM news ORDER BY createdAt DESC');
  return rows as any[];
}

export async function getNewsById(id: number) {
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
  return (rows as any[])[0];
}

async function handleUploads(formData: FormData): Promise<string[]> {
  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const files = formData.getAll("imageFiles") as File[];
  const uploadedPaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = file.name.replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      uploadedPaths.push(`/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createNews(formData: FormData) {
  const title = formData.get('title');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const img = formData.get('img');
  const category = formData.get('category');
  const date = formData.get('date');

  const newUploads = await handleUploads(formData);
  const finalImg = newUploads.length > 0 ? newUploads[0] : (img || '');

  const [result] = await pool.query(
    'INSERT INTO news (title, excerpt, content, img, category, date) VALUES (?, ?, ?, ?, ?, ?)',
    [title, excerpt, content, finalImg, category, date]
  );
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}

export async function updateNews(id: number, formData: FormData) {
  const title = formData.get('title');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const img = formData.get('img');
  const category = formData.get('category');
  const date = formData.get('date');

  const newUploads = await handleUploads(formData);
  const finalImg = newUploads.length > 0 ? newUploads[0] : (img || '');

  const [result] = await pool.query(
    'UPDATE news SET title = ?, excerpt = ?, content = ?, img = ?, category = ?, date = ? WHERE id = ?',
    [title, excerpt, content, finalImg, category, date, id]
  );
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}

export async function deleteNews(id: number) {
  const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}

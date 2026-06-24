"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function getTopLocations(limit: number = 4) {
  const [rows] = await pool.query(`
    SELECT TRIM(SUBSTRING_INDEX(location, ',', -1)) as name, COUNT(*) as count 
    FROM projects 
    WHERE location IS NOT NULL AND location != ''
    GROUP BY name
    ORDER BY count DESC
    LIMIT ?
  `, [limit]);
  return rows as { name: string; count: number }[];
}

export async function getAllLocations() {
  const [rows] = await pool.query(`
    SELECT DISTINCT TRIM(SUBSTRING_INDEX(location, ',', -1)) as name
    FROM projects 
    WHERE location IS NOT NULL AND location != ''
    ORDER BY name ASC
  `);
  return rows as { name: string }[];
}

export async function getProjects(params?: { search?: string, type?: string, category?: string, isFeatured?: string, location?: string, status?: string }) {
  let query = 'SELECT * FROM projects WHERE 1=1';
  const values: any[] = [];
  
  if (params?.status) {
    query += ' AND status = ?';
    values.push(params.status);
  }
  if (params?.search) {
    query += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params?.location) {
    query += ' AND location LIKE ?';
    values.push(`%${params.location}%`);
  }
  if (params?.type) {
    query += ' AND type = ?';
    values.push(params.type);
  }
  if (params?.category) {
    query += ' AND category = ?';
    values.push(params.category);
  }
  if (params?.isFeatured) {
    query += ' AND isFeatured = ?';
    values.push(params.isFeatured === 'true' ? 1 : 0);
  }
  
  query += ' ORDER BY createdAt DESC';
  const [rows] = await pool.query(query, values);
  return rows as any[];
}

export async function getProjectsPaginated(params?: { search?: string, location?: string, type?: string, category?: string, isFeatured?: string, status?: string, page?: number, limit?: number }) {
  let where = '1=1';
  const values: any[] = [];
  
  if (params?.status) {
    where += ' AND status = ?';
    values.push(params.status);
  }
  if (params?.search) {
    where += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params?.location) {
    where += ' AND location LIKE ?';
    values.push(`%${params.location}%`);
  }
  if (params?.type) {
    where += ' AND type = ?';
    values.push(params.type);
  }
  if (params?.category) {
    where += ' AND category = ?';
    values.push(params.category);
  }
  if (params?.isFeatured) {
    where += ' AND isFeatured = ?';
    values.push(params.isFeatured === 'true' ? 1 : 0);
  }
  
  const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM projects WHERE ${where}`, values);
  const total = (countRows as any)[0].total;

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM projects WHERE ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  const [rows] = await pool.query(query, [...values, limit, offset]);
  
  return { data: rows as any[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProject(id: number) {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  return (rows as any[])[0];
}

export async function incrementViews(id: number) {
  await pool.query('UPDATE projects SET views = views + 1 WHERE id = ?', [id]);
}

export async function getTopViewedProjects(limit: number = 3) {
  const [rows] = await pool.query('SELECT * FROM projects ORDER BY views DESC LIMIT ?', [limit]);
  return rows as any[];
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
      // Xóa khoảng trắng trong tên file để tránh lỗi URL
      const safeName = file.name.replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      uploadedPaths.push(`/api/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createProject(formData: FormData) {
  const title = formData.get('title');
  const location = formData.get('location');
  const area = formData.get('area');
  const price = formData.get('price');
  const description = formData.get('description');
  const type = formData.get('type');
  const category = formData.get('category');
  const bedrooms = formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string, 10) : 0;
  const bathrooms = formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string, 10) : 0;
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const status = formData.get('status') || 'published';
  // Thông tin khác
  const width = formData.get('width') || null;
  const length = formData.get('length') || null;
  const direction = formData.get('direction') || null;
  const frontRoad = formData.get('frontRoad') || null;
  const legal = formData.get('legal') || null;
  const floors = formData.get('floors') ? parseInt(formData.get('floors') as string, 10) : null;
  const hasKitchen = formData.get('hasKitchen') === 'on' || formData.get('hasKitchen') === 'true';
  const hasDiningRoom = formData.get('hasDiningRoom') === 'on' || formData.get('hasDiningRoom') === 'true';
  const hasTerrace = formData.get('hasTerrace') === 'on' || formData.get('hasTerrace') === 'true';
  const hasParking = formData.get('hasParking') === 'on' || formData.get('hasParking') === 'true';

  const existingImagesJson = formData.get('existingImages') as string;
  let finalImages: string[] = [];

  if (existingImagesJson) {
    try {
      finalImages = JSON.parse(existingImagesJson);
    } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  const mainImg = finalImages.length > 0 ? finalImages[0] : '';
  const sideImg = finalImages.length > 1 ? finalImages[1] : (finalImages.length > 0 ? finalImages[0] : '');

  const [result] = await pool.query(
    'INSERT INTO projects (title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, images, bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, JSON.stringify(finalImages), bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/listing');
  revalidatePath('/');
  return { success: true };
}

export async function updateProject(id: number, formData: FormData) {
  const title = formData.get('title');
  const location = formData.get('location');
  const area = formData.get('area');
  const price = formData.get('price');
  const description = formData.get('description');
  const type = formData.get('type');
  const category = formData.get('category');
  const bedrooms = formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string, 10) : 0;
  const bathrooms = formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string, 10) : 0;
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const status = formData.get('status') || 'published';
  // Thông tin khác
  const width = formData.get('width') || null;
  const length = formData.get('length') || null;
  const direction = formData.get('direction') || null;
  const frontRoad = formData.get('frontRoad') || null;
  const legal = formData.get('legal') || null;
  const floors = formData.get('floors') ? parseInt(formData.get('floors') as string, 10) : null;
  const hasKitchen = formData.get('hasKitchen') === 'on' || formData.get('hasKitchen') === 'true';
  const hasDiningRoom = formData.get('hasDiningRoom') === 'on' || formData.get('hasDiningRoom') === 'true';
  const hasTerrace = formData.get('hasTerrace') === 'on' || formData.get('hasTerrace') === 'true';
  const hasParking = formData.get('hasParking') === 'on' || formData.get('hasParking') === 'true';

  const existingImagesJson = formData.get('existingImages') as string;
  let finalImages: string[] = [];

  if (existingImagesJson) {
    try {
      finalImages = JSON.parse(existingImagesJson);
    } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  const mainImg = finalImages.length > 0 ? finalImages[0] : '';
  const sideImg = finalImages.length > 1 ? finalImages[1] : (finalImages.length > 0 ? finalImages[0] : '');

  const [result] = await pool.query(
    'UPDATE projects SET title = ?, location = ?, mainImg = ?, sideImg = ?, area = ?, price = ?, description = ?, isFeatured = ?, type = ?, category = ?, images = ?, bedrooms = ?, bathrooms = ?, status = ?, width = ?, length = ?, direction = ?, frontRoad = ?, legal = ?, floors = ?, hasKitchen = ?, hasDiningRoom = ?, hasTerrace = ?, hasParking = ? WHERE id = ?',
    [title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, JSON.stringify(finalImages), bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking, id]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/listing');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProject(id: number) {
  const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/listing');
  revalidatePath('/');
  return { success: true };
}

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

export async function getProjects() {
  const [rows] = await pool.query('SELECT * FROM projects ORDER BY createdAt DESC');
  return rows as any[];
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
      // Xóa khoảng trắng trong tên file để tránh lỗi URL
      const safeName = file.name.replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      uploadedPaths.push(`/uploads/${filename}`);
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
  const isFeatured = formData.get('isFeatured') === 'true';
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
    'INSERT INTO projects (title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, JSON.stringify(finalImages)]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
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
  const isFeatured = formData.get('isFeatured') === 'true';
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
    'UPDATE projects SET title = ?, location = ?, mainImg = ?, sideImg = ?, area = ?, price = ?, description = ?, isFeatured = ?, type = ?, category = ?, images = ? WHERE id = ?',
    [title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, JSON.stringify(finalImages), id]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProject(id: number) {
  const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/');
  return { success: true };
}

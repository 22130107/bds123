"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function getSpaces() {
  const [rows] = await pool.query('SELECT * FROM spaces ORDER BY createdAt DESC');
  return rows as any[];
}

export async function getSpace(id: number) {
  const [rows] = await pool.query('SELECT * FROM spaces WHERE id = ?', [id]);
  return (rows as any[])[0];
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
      const safeName = file.name.replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      uploadedPaths.push(`/api/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createSpace(formData: FormData) {
  const collection = formData.get('collection');
  const category = formData.get('category');
  const title = formData.get('title');
  const subtitle = formData.get('subtitle');
  const gridClass = formData.get('gridClass');
  const existingImages = formData.get('existingImages') as string;
  let coverIndex = parseInt(formData.get('coverIndex') as string) || 0;

  let finalImages: string[] = [];
  if (existingImages) {
    try { finalImages = JSON.parse(existingImages); } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  if (coverIndex > 0 && coverIndex < finalImages.length) {
    const coverImage = finalImages.splice(coverIndex, 1)[0];
    finalImages.unshift(coverImage);
  }

  const [result] = await pool.query(
    'INSERT INTO spaces (collection, category, title, subtitle, images, gridClass) VALUES (?, ?, ?, ?, ?, ?)',
    [collection, category, title, subtitle, JSON.stringify(finalImages), gridClass]
  );
  revalidatePath('/admin/spaces');
  revalidatePath('/');
  return { success: true };
}

export async function updateSpace(id: number, formData: FormData) {
  const collection = formData.get('collection');
  const category = formData.get('category');
  const title = formData.get('title');
  const subtitle = formData.get('subtitle');
  const gridClass = formData.get('gridClass');
  const existingImages = formData.get('existingImages') as string;
  let coverIndex = parseInt(formData.get('coverIndex') as string) || 0;

  let finalImages: string[] = [];
  if (existingImages) {
    try { finalImages = JSON.parse(existingImages); } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  if (coverIndex > 0 && coverIndex < finalImages.length) {
    const coverImage = finalImages.splice(coverIndex, 1)[0];
    finalImages.unshift(coverImage);
  }

  const [result] = await pool.query(
    'UPDATE spaces SET collection = ?, category = ?, title = ?, subtitle = ?, images = ?, gridClass = ? WHERE id = ?',
    [collection, category, title, subtitle, JSON.stringify(finalImages), gridClass, id]
  );
  revalidatePath('/admin/spaces');
  revalidatePath('/');
  return { success: true };
}

export async function deleteSpace(id: number) {
  const [result] = await pool.query('DELETE FROM spaces WHERE id = ?', [id]);
  revalidatePath('/admin/spaces');
  revalidatePath('/');
  return { success: true };
}

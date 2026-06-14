"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getSpaces() {
  const [rows] = await pool.query('SELECT * FROM spaces ORDER BY createdAt DESC');
  return rows as any[];
}

export async function getSpace(id: number) {
  const [rows] = await pool.query('SELECT * FROM spaces WHERE id = ?', [id]);
  return (rows as any[])[0];
}

export async function createSpace(data: any) {
  const { collection, category, title, subtitle, images, gridClass } = data;
  const [result] = await pool.query(
    'INSERT INTO spaces (collection, category, title, subtitle, images, gridClass) VALUES (?, ?, ?, ?, ?, ?)',
    [collection, category, title, subtitle, JSON.stringify(images), gridClass]
  );
  revalidatePath('/admin/spaces');
  revalidatePath('/');
  return { success: true };
}

export async function updateSpace(id: number, data: any) {
  const { collection, category, title, subtitle, images, gridClass } = data;
  const [result] = await pool.query(
    'UPDATE spaces SET collection = ?, category = ?, title = ?, subtitle = ?, images = ?, gridClass = ? WHERE id = ?',
    [collection, category, title, subtitle, JSON.stringify(images), gridClass, id]
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

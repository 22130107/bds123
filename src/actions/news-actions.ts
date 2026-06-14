"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getNews() {
  const [rows] = await pool.query('SELECT * FROM news ORDER BY createdAt DESC');
  return rows as any[];
}

export async function getNewsById(id: number) {
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
  return (rows as any[])[0];
}

export async function createNews(data: any) {
  const { title, excerpt, content, img, category, date } = data;
  const [result] = await pool.query(
    'INSERT INTO news (title, excerpt, content, img, category, date) VALUES (?, ?, ?, ?, ?, ?)',
    [title, excerpt, content, img, category, date]
  );
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}

export async function updateNews(id: number, data: any) {
  const { title, excerpt, content, img, category, date } = data;
  const [result] = await pool.query(
    'UPDATE news SET title = ?, excerpt = ?, content = ?, img = ?, category = ?, date = ? WHERE id = ?',
    [title, excerpt, content, img, category, date, id]
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

"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getNewsCategories() {
  const [rows] = await pool.query("SELECT * FROM news_categories ORDER BY name ASC");
  return rows as any[];
}

export async function addNewsCategory(name: string) {
  name = name.trim().toUpperCase();
  if (!name) return { success: false, error: "Tên không hợp lệ" };
  const [existing] = await pool.query("SELECT id FROM news_categories WHERE name = ?", [name]);
  if ((existing as any[]).length > 0) return { success: false, error: "Danh mục đã tồn tại" };
  await pool.query("INSERT INTO news_categories (name) VALUES (?)", [name]);
  revalidatePath("/admin/news-categories");
  revalidatePath("/admin/news");
  return { success: true };
}

export async function renameNewsCategory(id: number, name: string) {
  name = name.trim().toUpperCase();
  if (!name) return { success: false, error: "Tên không hợp lệ" };
  await pool.query("UPDATE news_categories SET name = ? WHERE id = ?", [name, id]);
  revalidatePath("/admin/news-categories");
  revalidatePath("/admin/news");
  return { success: true };
}

export async function deleteNewsCategory(id: number) {
  const [catRows] = await pool.query("SELECT name FROM news_categories WHERE id = ?", [id]);
  const catName = (catRows as any[])[0]?.name;
  if (catName) {
    await pool.query("UPDATE news SET category = NULL WHERE category = ?", [catName]);
  }
  await pool.query("DELETE FROM news_categories WHERE id = ?", [id]);
  revalidatePath("/admin/news-categories");
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { success: true };
}

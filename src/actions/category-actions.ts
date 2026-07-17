"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getCategories(onlyActive = false) {
  const q = onlyActive
    ? "SELECT * FROM categories WHERE is_active = 1 ORDER BY group_name DESC, id ASC"
    : "SELECT * FROM categories ORDER BY group_name DESC, id ASC";
  const [rows] = await pool.query(q);
  return rows as any[];
}

export async function getCategoryGroups(onlyActive = false) {
  const q = onlyActive
    ? "SELECT DISTINCT group_name FROM categories WHERE is_active = 1 ORDER BY group_name DESC"
    : "SELECT DISTINCT group_name FROM categories ORDER BY group_name DESC";
  const [rows] = await pool.query(q);
  return (rows as any[]).map(r => r.group_name);
}

export async function toggleCategory(id: number) {
  const [rows] = await pool.query("SELECT is_active FROM categories WHERE id = ?", [id]);
  const data = rows as any[];
  if (data.length === 0) return { success: false, error: "Không tìm thấy" };
  const newVal = data[0].is_active ? 0 : 1;
  await pool.query("UPDATE categories SET is_active = ? WHERE id = ?", [newVal, id]);
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects/new");
  revalidatePath("/");
  return { success: true, is_active: !!newVal };
}

export async function getCategoryById(id: number) {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  const data = rows as any[];
  return data.length > 0 ? data[0] : null;
}

export async function updateCategory(id: number, formData: FormData) {
  const name = formData.get('name');
  const group_name = formData.get('group_name');

  await pool.query('UPDATE categories SET name = ?, group_name = ? WHERE id = ?', [name, group_name, id]);
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/projects/new');
  revalidatePath('/');
  return { success: true };
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name');
  const group_name = formData.get('group_name');

  await pool.query('INSERT INTO categories (name, group_name) VALUES (?, ?)', [name, group_name]);
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/projects/new');
  revalidatePath('/');
  return { success: true };
}

export async function deleteCategory(id: number) {
  const [rows] = await pool.query('SELECT name FROM categories WHERE id = ?', [id]);
  const data = rows as any[];
  const catName = data.length > 0 ? data[0].name : '';

  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  if (catName) {
    await pool.query('UPDATE projects SET category = NULL WHERE category = ?', [catName]);
  }
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/projects/new');
  revalidatePath('/');
  return { success: true };
}

"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY group_name DESC, id ASC');
  return rows as any[];
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
  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/projects/new');
  revalidatePath('/');
  return { success: true };
}

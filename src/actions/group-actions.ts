"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getGroups(onlyActive = false) {
  const q = onlyActive
    ? "SELECT DISTINCT group_name FROM categories WHERE is_active = 1 ORDER BY group_name DESC"
    : "SELECT DISTINCT group_name FROM categories ORDER BY group_name DESC";
  const [rows] = await pool.query(q);
  return (rows as any[]).map((r: any) => r.group_name);
}

export async function toggleGroup(groupName: string) {
  const [rows] = await pool.query("SELECT is_active FROM categories WHERE group_name = ? LIMIT 1", [groupName]);
  const data = rows as any[];
  if (data.length === 0) return { success: false, error: "Không tìm thấy" };
  const newVal = data[0].is_active ? 0 : 1;
  await pool.query("UPDATE categories SET is_active = ? WHERE group_name = ?", [newVal, groupName]);
  revalidatePath("/admin");
  revalidatePath("/admin/groups");
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true, is_active: !!newVal };
}

export async function addGroup(groupName: string) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) as cnt FROM categories WHERE group_name = ?', [groupName]
  );
  if ((rows as any[])[0].cnt > 0) {
    return { success: false, error: "Nhóm này đã tồn tại" };
  }
  await pool.query(
    'INSERT INTO categories (name, group_name) VALUES (?, ?)',
    [groupName + " (mới)", groupName]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/groups');
  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { success: true };
}

export async function renameGroup(oldName: string, newName: string) {
  await pool.query(
    'UPDATE categories SET group_name = ? WHERE group_name = ?',
    [newName, oldName]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/groups');
  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { success: true };
}

export async function deleteGroup(groupName: string) {
  const [rows] = await pool.query(
    'SELECT name FROM categories WHERE group_name = ?', [groupName]
  );
  const catNames = (rows as any[]).map(r => r.name);
  if (catNames.length > 0) {
    await pool.query(
      'UPDATE projects SET category = NULL WHERE category IN (' + catNames.map(() => '?').join(',') + ')',
      catNames
    );
  }
  await pool.query('DELETE FROM categories WHERE group_name = ?', [groupName]);
  revalidatePath('/admin');
  revalidatePath('/admin/groups');
  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { success: true };
}

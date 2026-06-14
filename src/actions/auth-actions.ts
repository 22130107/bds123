"use server";

import { cookies } from "next/headers";
import { pool } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "batdongsan-admin-secret-key-2026";

export async function login(username: string, password: string) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    const users = rows as any[];
    if (users.length === 0) {
      return { success: false, error: "Sai tên đăng nhập hoặc mật khẩu" };
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return { success: false, error: "Sai tên đăng nhập hoặc mật khẩu" };
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Lỗi hệ thống, vui lòng thử lại" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return { authenticated: false };

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
    return { authenticated: true, user: decoded };
  } catch {
    return { authenticated: false };
  }
}

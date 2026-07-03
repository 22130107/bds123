"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import sharp from "sharp";

export async function getAgentInfo() {
  try {
    const [rows] = await pool.query(
      `SELECT setting_value FROM settings WHERE setting_key = 'agent_info'`
    );
    const data = rows as any[];
    if (data.length > 0) {
      return JSON.parse(data[0].setting_value);
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin agent:", error);
    return null;
  }
}

async function handleUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) return null;

  const uploadDir = join(process.cwd(), ".uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-');
  const filename = `${Date.now()}-${safeName}.webp`;
  const filepath = join(uploadDir, filename);
  
  await sharp(buffer)
    .webp({ quality: 80, lossless: false })
    .toFile(filepath);
  
  return `/api/uploads/${filename}`;
}

export async function updateAgentInfo(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const phone = formData.get("phone") as string;
    const zalo = formData.get("zalo") as string;
    let avatar = formData.get("avatar") as string;
    const isOnline = formData.get("isOnline") === "true";

    const avatarFile = formData.get("avatarFile") as File;
    const uploadedUrl = await handleUpload(avatarFile);
    if (uploadedUrl) {
      avatar = uploadedUrl;
    }

    const newAgentInfo = {
      name,
      title,
      phone,
      zalo,
      avatar,
      isOnline,
    };

    const value = JSON.stringify(newAgentInfo);

    await pool.query(
      `INSERT INTO settings (setting_key, setting_value) 
       VALUES ('agent_info', ?) 
       ON DUPLICATE KEY UPDATE setting_value = ?`,
      [value, value]
    );

    revalidatePath("/admin/settings");
    revalidatePath("/detail/[id]", "page");
    revalidatePath("/contact");
    
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật agent info:", error);
    return { success: false, error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

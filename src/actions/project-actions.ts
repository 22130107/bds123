"use server";

import { pool } from "../lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { generateSlug } from "../lib/slugify";
import sharp from "sharp";

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

export async function getAllLocations() {
  const [rows] = await pool.query(`
    SELECT DISTINCT TRIM(SUBSTRING_INDEX(location, ',', -1)) as name
    FROM projects 
    WHERE location IS NOT NULL AND location != ''
    ORDER BY name ASC
  `);
  return rows as { name: string }[];
}

export async function getAllInvestors() {
  const [rows] = await pool.query(`
    SELECT DISTINCT investor as name
    FROM projects 
    WHERE investor IS NOT NULL AND investor != ''
    ORDER BY name ASC
  `);
  return rows as { name: string }[];
}

export async function getProjects(params?: { search?: string, type?: string, category?: string, isFeatured?: string, location?: string, status?: string, investor?: string }) {
  let query = 'SELECT * FROM projects WHERE 1=1';
  const values: any[] = [];
  
  if (params?.status) {
    query += ' AND status = ?';
    values.push(params.status);
  }
  if (params?.search) {
    query += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params?.location) {
    query += ' AND location LIKE ?';
    values.push(`%${params.location}%`);
  }
  if (params?.type) {
    query += ' AND type = ?';
    values.push(params.type);
  }
  if (params?.category) {
    query += ' AND category = ?';
    values.push(params.category);
  }
  if (params?.isFeatured) {
    query += ' AND isFeatured = ?';
    values.push(params.isFeatured === 'true' ? 1 : 0);
  }
  if (params?.investor) {
    query += ' AND investor LIKE ?';
    values.push(`%${params.investor}%`);
  }
  
  query += ' ORDER BY createdAt DESC';
  const [rows] = await pool.query(query, values);
  return rows as any[];
}

export async function getProjectsPaginated(params?: { search?: string, location?: string, type?: string, category?: string, isFeatured?: string, status?: string, page?: number, limit?: number, investor?: string }) {
  let where = '1=1';
  const values: any[] = [];
  
  if (params?.status) {
    where += ' AND status = ?';
    values.push(params.status);
  }
  if (params?.search) {
    where += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
    values.push(`%${params.search}%`, `%${params.search}%`, `%${params.search}%`);
  }
  if (params?.location) {
    where += ' AND location LIKE ?';
    values.push(`%${params.location}%`);
  }
  if (params?.type) {
    where += ' AND type = ?';
    values.push(params.type);
  }
  if (params?.category) {
    where += ' AND category = ?';
    values.push(params.category);
  }
  if (params?.isFeatured) {
    where += ' AND isFeatured = ?';
    values.push(params.isFeatured === 'true' ? 1 : 0);
  }
  if (params?.investor) {
    where += ' AND investor LIKE ?';
    values.push(`%${params.investor}%`);
  }
  
  const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM projects WHERE ${where}`, values);
  const total = (countRows as any)[0].total;

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM projects WHERE ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  const [rows] = await pool.query(query, [...values, limit, offset]);
  
  return { data: rows as any[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProject(id: number) {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  return (rows as any[])[0];
}

export async function getProjectBySlug(slug: string) {
  const [rows] = await pool.query('SELECT * FROM projects WHERE slug = ?', [slug]);
  const result = (rows as any[])[0];
  if (result) return result;

  const id = parseInt(slug, 10);
  if (!isNaN(id)) {
    const [idRows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    return (idRows as any[])[0];
  }

  return null;
}

async function ensureUniqueSlug(slug: string, excludeId?: number): Promise<string> {
  let candidate = slug;
  let counter = 2;
  while (true) {
    let query = 'SELECT id FROM projects WHERE slug = ?';
    const values: any[] = [candidate];
    if (excludeId) {
      query += ' AND id != ?';
      values.push(excludeId);
    }
    const [rows] = await pool.query(query, values);
    if ((rows as any[]).length === 0) return candidate;
    candidate = `${slug}-${counter}`;
    counter++;
  }
}

export async function incrementViews(id: number) {
  await pool.query('UPDATE projects SET views = views + 1 WHERE id = ?', [id]);
}

export async function getTopViewedProjects(limit: number = 3) {
  const [rows] = await pool.query('SELECT * FROM projects ORDER BY views DESC LIMIT ?', [limit]);
  return rows as any[];
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
      // Xóa khoảng trắng trong tên file để tránh lỗi URL
      const safeName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-');
      const filename = `${Date.now()}-${safeName}.webp`;
      const filepath = join(uploadDir, filename);
      
      await sharp(buffer)
        .webp({ quality: 80, lossless: false })
        .toFile(filepath);
        
      uploadedPaths.push(`/api/uploads/${filename}`);
    }
  }
  return uploadedPaths;
}

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const location = formData.get('location');
  const area = formData.get('area');
  const price = formData.get('price');
  const description = formData.get('description');
  const investor = formData.get('investor') || null;
  const type = formData.get('type');
  const category = formData.get('category');
  const badge = formData.get('badge') || '';
  const bedrooms = formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string, 10) : 0;
  const bathrooms = formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string, 10) : 0;
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const status = formData.get('status') || 'published';
  const meta_description = formData.get('meta_description') || '';
  const schema_markup = formData.get('schema_markup') || '';
  // Thông tin khác
  const width = formData.get('width') || null;
  const length = formData.get('length') || null;
  const direction = formData.get('direction') || null;
  const frontRoad = formData.get('frontRoad') || null;
  const legal = formData.get('legal') || null;
  const floors = formData.get('floors') ? parseInt(formData.get('floors') as string, 10) : null;
  const hasKitchen = formData.get('hasKitchen') === 'on' || formData.get('hasKitchen') === 'true';
  const hasDiningRoom = formData.get('hasDiningRoom') === 'on' || formData.get('hasDiningRoom') === 'true';
  const hasTerrace = formData.get('hasTerrace') === 'on' || formData.get('hasTerrace') === 'true';
  const hasParking = formData.get('hasParking') === 'on' || formData.get('hasParking') === 'true';

  let slug = (formData.get('slug') as string || '').trim();
  if (!slug) {
    slug = generateSlug(title);
  } else {
    slug = generateSlug(slug);
  }
  slug = await ensureUniqueSlug(slug);

  const existingImagesJson = formData.get('existingImages') as string;
  let finalImages: string[] = [];

  if (existingImagesJson) {
    try {
      finalImages = JSON.parse(existingImagesJson);
    } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  const coverIndexStr = formData.get('coverIndex') as string;
  let coverIndex = parseInt(coverIndexStr, 10);
  if (isNaN(coverIndex)) coverIndex = 0;

  const sideIndexStr = formData.get('sideIndex') as string;
  let sideIndex = parseInt(sideIndexStr, 10);
  if (isNaN(sideIndex)) sideIndex = 1;

  const mainImg = finalImages.length > 0 ? (finalImages[coverIndex] || finalImages[0]) : '';
  const sideImg = finalImages.length > 0 ? (finalImages[sideIndex] || mainImg) : '';

  if (coverIndex > 0 && coverIndex < finalImages.length) {
    const coverImage = finalImages.splice(coverIndex, 1)[0];
    finalImages.unshift(coverImage);
  }

  const [result] = await pool.query(
    'INSERT INTO projects (title, slug, meta_description, schema_markup, location, mainImg, sideImg, area, price, description, investor, isFeatured, type, category, badge, images, bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, slug, meta_description, schema_markup, location, mainImg, sideImg, area, price, description, investor, isFeatured, type, category, badge, JSON.stringify(finalImages), bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/danh-muc');
  revalidatePath('/');
  return { success: true };
}

export async function updateProject(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const location = formData.get('location');
  const area = formData.get('area');
  const price = formData.get('price');
  const description = formData.get('description');
  const investor = formData.get('investor') || null;
  const type = formData.get('type');
  const category = formData.get('category');
  const badge = formData.get('badge') || '';
  const bedrooms = formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string, 10) : 0;
  const bathrooms = formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string, 10) : 0;
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const status = formData.get('status') || 'published';
  const meta_description = formData.get('meta_description') || '';
  const schema_markup = formData.get('schema_markup') || '';
  // Thông tin khác
  const width = formData.get('width') || null;
  const length = formData.get('length') || null;
  const direction = formData.get('direction') || null;
  const frontRoad = formData.get('frontRoad') || null;
  const legal = formData.get('legal') || null;
  const floors = formData.get('floors') ? parseInt(formData.get('floors') as string, 10) : null;
  const hasKitchen = formData.get('hasKitchen') === 'on' || formData.get('hasKitchen') === 'true';
  const hasDiningRoom = formData.get('hasDiningRoom') === 'on' || formData.get('hasDiningRoom') === 'true';
  const hasTerrace = formData.get('hasTerrace') === 'on' || formData.get('hasTerrace') === 'true';
  const hasParking = formData.get('hasParking') === 'on' || formData.get('hasParking') === 'true';

  let slug = (formData.get('slug') as string || '').trim();
  if (!slug) {
    slug = generateSlug(title);
  } else {
    slug = generateSlug(slug);
  }
  slug = await ensureUniqueSlug(slug, id);

  const existingImagesJson = formData.get('existingImages') as string;
  let finalImages: string[] = [];

  if (existingImagesJson) {
    try {
      finalImages = JSON.parse(existingImagesJson);
    } catch(e) {}
  }

  const newUploads = await handleUploads(formData);
  finalImages = [...finalImages, ...newUploads];

  const coverIndexStr = formData.get('coverIndex') as string;
  let coverIndex = parseInt(coverIndexStr, 10);
  if (isNaN(coverIndex)) coverIndex = 0;

  const sideIndexStr = formData.get('sideIndex') as string;
  let sideIndex = parseInt(sideIndexStr, 10);
  if (isNaN(sideIndex)) sideIndex = 1;

  const mainImg = finalImages.length > 0 ? (finalImages[coverIndex] || finalImages[0]) : '';
  const sideImg = finalImages.length > 0 ? (finalImages[sideIndex] || mainImg) : '';

  if (coverIndex > 0 && coverIndex < finalImages.length) {
    const coverImage = finalImages.splice(coverIndex, 1)[0];
    finalImages.unshift(coverImage);
  }

  const [result] = await pool.query(
    'UPDATE projects SET title = ?, slug = ?, meta_description = ?, schema_markup = ?, location = ?, mainImg = ?, sideImg = ?, area = ?, price = ?, description = ?, investor = ?, isFeatured = ?, type = ?, category = ?, badge = ?, images = ?, bedrooms = ?, bathrooms = ?, status = ?, width = ?, length = ?, direction = ?, frontRoad = ?, legal = ?, floors = ?, hasKitchen = ?, hasDiningRoom = ?, hasTerrace = ?, hasParking = ? WHERE id = ?',
    [title, slug, meta_description, schema_markup, location, mainImg, sideImg, area, price, description, investor, isFeatured, type, category, badge, JSON.stringify(finalImages), bedrooms, bathrooms, status, width, length, direction, frontRoad, legal, floors, hasKitchen, hasDiningRoom, hasTerrace, hasParking, id]
  );
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/danh-muc');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProject(id: number) {
  const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  revalidatePath('/danh-muc');
  revalidatePath('/');
  return { success: true };
}

function parsePrice(priceStr: string | null | undefined): number {
  if (!priceStr) return 0;
  const lower = priceStr.toLowerCase();
  let numStr = priceStr.replace(/,/g, '.').replace(/[^\d.]/g, '');
  let num = parseFloat(numStr);
  if (isNaN(num)) return 0;
  if (lower.includes('tỷ')) return num * 1000000000;
  if (lower.includes('triệu')) return num * 1000000;
  return num;
}

export async function getRelatedProjectsForDetail(project: any) {
  const [rows] = await pool.query("SELECT * FROM projects WHERE status = 'published' AND id != ?", [project.id]);
  const allProjects = rows as any[];
  const usedIds = new Set<number>();

  const currentPrice = parsePrice(project.price);
  
  // Helpers
  const shuffle = (array: any[]) => array.sort(() => 0.5 - Math.random());
  
  // 1. Same price (+- 500 million), different location
  const priceRange = 500000000;
  const samePriceDiffLocation = allProjects.filter(p => {
    // We consider "different location" strictly as different string for now, or just extract the city
    const getCity = (loc: string) => loc ? loc.split(',').pop()?.trim() : "";
    const pCity = getCity(p.location);
    const cCity = getCity(project.location);
    
    if (pCity === cCity && pCity !== "") return false;
    if (currentPrice === 0) return false;
    
    const pPrice = parsePrice(p.price);
    return pPrice > 0 && Math.abs(pPrice - currentPrice) <= priceRange;
  });
  
  const row1 = shuffle(samePriceDiffLocation).slice(0, 4);
  row1.forEach(p => usedIds.add(p.id));

  // 2. Same location, not in usedIds
  const sameLocation = allProjects.filter(p => {
    const getCity = (loc: string) => loc ? loc.split(',').pop()?.trim() : "";
    return getCity(p.location) === getCity(project.location) && !usedIds.has(p.id);
  });
  const row2 = shuffle(sameLocation).slice(0, 4);
  row2.forEach(p => usedIds.add(p.id));

  // 3. Most viewed, not in usedIds
  const remaining = allProjects.filter(p => !usedIds.has(p.id));
  const row3 = remaining.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  return { row1, row2, row3 };
}


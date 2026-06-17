import { pool } from "./src/lib/db";

const sampleProjects = Array.from({ length: 12 }).map((_, i) => ({
  title: `Dự án mẫu số ${i + 1}`,
  location: `Đường ${i + 1}, Quận ${i % 3 === 0 ? '1' : '2'}, TP. Hồ Chí Minh`,
  mainImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
  sideImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
  area: 100 + i * 10,
  price: `${5 + i} Tỷ VNĐ`,
  description: `Đây là mô tả cho dự án mẫu số ${i + 1}. Dự án có đầy đủ tiện ích và vị trí đắc địa.`,
  isFeatured: i % 4 === 0,
  type: i % 2 === 0 ? 'listing' : 'tailored',
  category: 'Căn hộ chung cư',
  images: JSON.stringify([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
  ]),
  bedrooms: 2 + (i % 3),
  bathrooms: 1 + (i % 2),
}));

async function seed() {
  for (const item of sampleProjects) {
    await pool.query(
      'INSERT INTO projects (title, location, mainImg, sideImg, area, price, description, isFeatured, type, category, images, bedrooms, bathrooms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [item.title, item.location, item.mainImg, item.sideImg, item.area, item.price, item.description, item.isFeatured, item.type, item.category, item.images, item.bedrooms, item.bathrooms]
    );
  }
  console.log(`Seeded ${sampleProjects.length} projects`);
  process.exit(0);
}
seed();

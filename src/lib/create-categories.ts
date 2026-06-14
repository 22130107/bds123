import { pool } from "./db";

async function alterTable() {
  try {
    console.log("Creating categories table...");
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        group_name VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Successfully created 'categories' table.");
    
    // Seed some initial data so it's not empty
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM categories');
    if ((rows as any)[0].count === 0) {
       console.log("Seeding initial categories...");
       const initialCategories = [
         ['BÁN CĂN HỘ CHUNG CƯ', 'MUA BÁN NHÀ ĐẤT'],
         ['BÁN NHÀ RIÊNG', 'MUA BÁN NHÀ ĐẤT'],
         ['BÁN BIỆT THỰ, LIỀN KỀ', 'MUA BÁN NHÀ ĐẤT'],
         ['BÁN NHÀ MẶT PHỐ', 'MUA BÁN NHÀ ĐẤT'],
         ['BÁN ĐẤT NỀN DỰ ÁN', 'MUA BÁN NHÀ ĐẤT'],
         ['BÁN ĐẤT', 'MUA BÁN NHÀ ĐẤT'],
         ['CHO THUÊ CĂN HỘ CHUNG CƯ', 'CHO THUÊ NHÀ ĐẤT'],
         ['CHO THUÊ NHÀ RIÊNG', 'CHO THUÊ NHÀ ĐẤT'],
         ['CHO THUÊ BIỆT THỰ, NHÀ LIỀN KỀ', 'CHO THUÊ NHÀ ĐẤT'],
         ['CHO THUÊ CỬA HÀNG, KIOT', 'CHO THUÊ NHÀ ĐẤT'],
         ['CHO THUÊ VĂN PHÒNG', 'CHO THUÊ NHÀ ĐẤT'],
         ['DỰ ÁN CĂN HỘ CHUNG CƯ', 'DỰ ÁN'],
         ['DỰ ÁN BIỆT THỰ, LIỀN KỀ', 'DỰ ÁN'],
         ['DỰ ÁN ĐẤT NỀN', 'DỰ ÁN'],
         ['DỰ ÁN KHU ĐÔ THỊ MỚI', 'DỰ ÁN']
       ];
       for(const [name, group] of initialCategories) {
          await pool.execute('INSERT INTO categories (name, group_name) VALUES (?, ?)', [name, group]);
       }
       console.log("Seed done!");
    }
  } catch (error: any) {
    console.error("Error creating table:", error);
  } finally {
    process.exit(0);
  }
}

alterTable();

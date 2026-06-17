import mysql from 'mysql2/promise';

async function initDB() {
  try {
    // 1. Connect without database to create it
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345',
    });

    console.log("Connected to MySQL server.");

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS `bds` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log("Database 'bds' created or already exists.");

    // Use database
    await connection.query('USE `bds`');

    // Create 'projects' table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        price VARCHAR(100),
        area INT,
        bedrooms INT,
        bathrooms INT,
        mainImg VARCHAR(500),
        sideImg VARCHAR(500),
        badge VARCHAR(100),
        isFeatured BOOLEAN DEFAULT false,
        type VARCHAR(50) DEFAULT 'listing',
        status VARCHAR(50) DEFAULT 'published',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'projects' created.");

    // Create 'spaces' table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS spaces (
        id INT AUTO_INCREMENT PRIMARY KEY,
        collection VARCHAR(100),
        category VARCHAR(100),
        title VARCHAR(255),
        subtitle TEXT,
        images JSON,
        gridClass VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'spaces' created.");

    // Create 'news' table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        img VARCHAR(500),
        category VARCHAR(100),
        date VARCHAR(50),
        status VARCHAR(50) DEFAULT 'published',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'news' created.");

    await connection.end();
    console.log("Database initialization completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

initDB();

import { pool } from './db';

async function main() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Creating consultations table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Consultations table created successfully.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error creating consultations table:', error);
    process.exit(1);
  }
}

main();

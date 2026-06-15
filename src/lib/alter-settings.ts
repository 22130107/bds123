import { pool } from './db';

async function main() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Creating settings table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value TEXT
      )
    `);

    // Insert default agent info
    const defaultAgentInfo = JSON.stringify({
      name: "Anh Tuấn Nguyễn",
      title: "Đại diện phân phối dự án",
      phone: "0982 831 582",
      zalo: "https://zalo.me/0982831582",
      avatar: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      isOnline: true
    });

    await connection.query(`
      INSERT IGNORE INTO settings (setting_key, setting_value) 
      VALUES ('agent_info', ?)
    `, [defaultAgentInfo]);

    console.log('Settings table created and seeded successfully.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error creating settings table:', error);
    process.exit(1);
  }
}

main();

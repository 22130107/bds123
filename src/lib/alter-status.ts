import { pool } from "./db";

async function alterTable() {
  try {
    console.log("Altering projects table...");
    await pool.execute(`ALTER TABLE projects ADD COLUMN status VARCHAR(50) DEFAULT 'published'`);
    console.log("Successfully added 'status' column to 'projects'.");
  } catch (error: any) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("Column 'status' already exists in projects.");
    } else {
      console.error("Error altering projects table:", error);
    }
  }

  try {
    console.log("Altering news table...");
    await pool.execute(`ALTER TABLE news ADD COLUMN status VARCHAR(50) DEFAULT 'published'`);
    console.log("Successfully added 'status' column to 'news'.");
  } catch (error: any) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("Column 'status' already exists in news.");
    } else {
      console.error("Error altering news table:", error);
    }
  }

  process.exit(0);
}

alterTable();

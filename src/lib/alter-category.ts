import { pool } from "./db";

async function alterTable() {
  try {
    console.log("Altering projects table to add category...");
    await pool.execute(`ALTER TABLE projects ADD COLUMN category VARCHAR(255)`);
    console.log("Successfully added 'category' column to 'projects'.");
  } catch (error: any) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("Column 'category' already exists.");
    } else {
      console.error("Error altering table:", error);
    }
  } finally {
    process.exit(0);
  }
}

alterTable();

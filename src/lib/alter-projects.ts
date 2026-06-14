import { pool } from "./db";

async function alterTable() {
  try {
    console.log("Altering projects table...");
    await pool.execute(`ALTER TABLE projects ADD COLUMN images JSON`);
    console.log("Successfully added 'images' column to 'projects'.");
  } catch (error: any) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("Column 'images' already exists.");
    } else {
      console.error("Error altering table:", error);
    }
  } finally {
    process.exit(0);
  }
}

alterTable();

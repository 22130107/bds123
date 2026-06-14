import { pool } from "./db";

async function alterTable() {
  try {
    console.log("Adding views column to projects table...");
    await pool.execute(`ALTER TABLE projects ADD COLUMN views INT DEFAULT 0`);
    console.log("Successfully added views column.");
  } catch (error: any) {
    // Ignore error if column already exists
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("Column views already exists.");
    } else {
      console.error("Error altering table:", error);
    }
  } finally {
    process.exit(0);
  }
}

alterTable();

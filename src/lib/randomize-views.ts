import { pool } from "./db";

async function run() {
  await pool.query('UPDATE projects SET views = FLOOR(RAND() * 500) + 50');
  console.log("Views randomized.");
  process.exit(0);
}

run();

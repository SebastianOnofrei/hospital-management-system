require("dotenv").config();
const { Client } = require("pg");

const databases = [
  "hospital_auth",
  "hospital_patients",
  "hospital_doctors",
  "hospital_appointments",
  "hospital_billing",
  "hospital_pharmacy",
  "hospital_notifications",
];

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

async function setupDatabases() {
  await client.connect();

  for (const database of databases) {
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [database],
    );

    if (result.rowCount > 0) {
      console.log(`✓ ${database} already exists`);
      continue;
    }

    await client.query(`CREATE DATABASE "${database}"`);

    console.log(`✓ Created ${database}`);
  }

  await client.end();

  console.log("\nDatabase setup completed.");
}

setupDatabases().catch((error) => {
  console.error("Database setup failed:");
  console.error(error);
  process.exit(1);
});

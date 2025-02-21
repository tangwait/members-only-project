const { Client } = require("pg");
require("dotenv").config();

const SQL =`
DROP TABLE IF EXISTS users, messages;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) ON DELETE CASCADE);
    `;

async function main() {
    console.log("Seeding database...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Required for Render
  });
  
  
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Database seeded successfully!");
  }
  
  main();
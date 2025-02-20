import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// This function opens a connection to the SQLite database (creates the database file if it doesn't exist)
export const openDatabase = async (): Promise<Database> => {
  try {
    const db = await open({
      filename: './mydatabase.db', // Path to your SQLite database
      driver: sqlite3.Database,
    });
    console.log('Connected to the SQLite database.');
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

// Create a simple table for demonstration
export const createTable = async (db: Database) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    );
  `;
  await db.run(query);
  console.log('Users table created (if not exists).');
};

// Insert user data into the users table
export const insertUser = async (db: Database, name: string, age: number) => {
  const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
  await db.run(query, [name, age]);
  console.log(`User ${name} inserted.`);
};

// Fetch all users from the users table
export const getUsers = async (db: Database) => {
  const query = 'SELECT * FROM users';
  const users = await db.all(query);
  return users;
};

// Close the database connection
export const closeDatabase = async (db: Database) => {
  await db.close();
  console.log('Database connection closed.');
};

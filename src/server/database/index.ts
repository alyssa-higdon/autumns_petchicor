import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let _db: Database | null = null; // Correct type here

export const initDatabase = async () => {
  // Open the SQLite database (or create it if it doesn't exist)
  _db = await open({
    filename: './myDatabase.db', // Database file (use relative path or absolute path as required)
    driver: sqlite3.Database,
  });

  console.log('Database initialized');

  // Create users table if it doesn't exist
  await _db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    );
  `);

  // Create courses table if it doesn't exist
  await _db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      instructor TEXT,
      credits INTEGER,
      semester TEXT
    );
  `);

  console.log('Tables created or verified');
};


// Expose the database connection (for use in other parts of your application)
export const getDatabase = (): Database => {
  if (!_db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  console.log("Got database");
  return _db;
};
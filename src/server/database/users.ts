// src/server/database/users.ts
import { getDatabase} from './index';

// Insert a user into the users table
export const insertUser = async (name: string, age: number) => {
  const db = getDatabase()
  await db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
  console.log(`User ${name} inserted into the database`);
};

export const getUsers = async (): Promise<{ id: number; name: string; age: number }[]> => {
  const db = getDatabase()
  const res = await db.all('SELECT * FROM users');
  return res.map((row) => ({
    id: row.id,
    name: row.name,
    age: row.age,
  }));
};
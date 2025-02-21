// src/server/database/courses.ts
import {getDatabase} from './index';

// Insert a course into the courses table
export const insertCourse = async (name: string, instructor: string, credits: number, semester: string) => {
  const db = getDatabase()
  await db.run('INSERT INTO courses (name, instructor, credits, semester) VALUES (?, ?, ?, ?)', [name, instructor, credits, semester]);
  console.log(`Course ${name} inserted into the database`);
};
export const getCourses = async(): Promise<{ id: number; name: string; instructor: string; credits: number; semester: string }[]> => {
  const db = getDatabase()
  const res = await db.all('SELECT * FROM courses');
  return res.map((row) => ({
    id: row.id,
    name: row.name,
    instructor: row.instructor,
    credits: row.credits,
    semester: row.semester,
  }));
};




// src/server/routes/courses.ts
import express from 'express';
import { insertCourse, getCourses } from '../database/courses';

const router = express.Router();

// Get all college courses
router.get('/', (req, res) => {
  const courses = getCourses();
  res.json(courses);
});

// Insert a new college course
router.post('/', (req, res) => {
  const { name, instructor, credits, semester } = req.body;
  insertCourse(name, instructor, credits, semester);
  res.status(201).json({ message: 'Course created successfully' });
});

export default router;

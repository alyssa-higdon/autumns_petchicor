// src/server/routes/users.ts
import express from 'express';
import { insertUser, getUsers } from '../database/users';

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Insert a new user
router.post('/', (req, res) => {
  const { name, age } = req.body;
  insertUser(name, age);
  res.status(201).json({ message: 'User created successfully' });
});

export default router;

// src/server/server.ts
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { initDatabase } from './database/index';
import userRoutes from './routes/users';
import courseRoutes from './routes/courses';

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Initialize the database
initDatabase().then(() => {
  console.log('Database initialized');
});

// Serve static files from the 'client' directory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../client')));

// API routes for users and courses
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

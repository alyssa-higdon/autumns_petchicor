import express, { Request, Response } from 'express';
import { openDatabase, createTable, insertUser, getUsers, closeDatabase } from './database';

const app = express();
const port = 3000;

app.use(express.json());  // Middleware to parse JSON requests
app.use(express.static('src/public')); // Serve static files from public directory

let db: any;

const initDatabase = async () => {
  try {
    db = await openDatabase();
    await createTable(db);
  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
};

// API route to get all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await getUsers(db);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// API route to insert a new user
app.post('/api/users', async (req: Request, res: Response) => {
  const { name, age } = req.body;
  try {
    await insertUser(db, name, age);
    res.status(201).send('User created');
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).send('Error inserting user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  initDatabase();  // Initialize the database on server start
});
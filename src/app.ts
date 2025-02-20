import { openDatabase, createTable, insertUser, getUsers, closeDatabase } from './database';

const runApp = async () => {
  try {
    // Open the database connection
    const db = await openDatabase();

    // Create the table if it doesn't exist
    await createTable(db);

    // Insert some users
    await insertUser(db, 'Alice', 25);
    await insertUser(db, 'Bob', 30);

    // Fetch and log all users
    const users = await getUsers(db);
    console.log('Users:', users);

    // Close the database connection
    await closeDatabase(db);
  } catch (error) {
    console.error('Error in application:', error);
  }
};

// Run the application
runApp();

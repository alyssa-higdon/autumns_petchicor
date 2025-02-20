"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.getUsers = exports.insertUser = exports.createTable = exports.openDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// This function opens a connection to the SQLite database (creates the database file if it doesn't exist)
const openDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, sqlite_1.open)({
            filename: './mydatabase.db', // Path to your SQLite database
            driver: sqlite3_1.default.Database,
        });
        console.log('Connected to the SQLite database.');
        return db;
    }
    catch (error) {
        console.error('Error opening database:', error);
        throw error;
    }
});
exports.openDatabase = openDatabase;
// Create a simple table for demonstration
const createTable = (db) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    );
  `;
    yield db.run(query);
    console.log('Users table created (if not exists).');
});
exports.createTable = createTable;
// Insert user data into the users table
const insertUser = (db, name, age) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
    yield db.run(query, [name, age]);
    console.log(`User ${name} inserted.`);
});
exports.insertUser = insertUser;
// Fetch all users from the users table
const getUsers = (db) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users';
    const users = yield db.all(query);
    return users;
});
exports.getUsers = getUsers;
// Close the database connection
const closeDatabase = (db) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
    console.log('Database connection closed.');
});
exports.closeDatabase = closeDatabase;

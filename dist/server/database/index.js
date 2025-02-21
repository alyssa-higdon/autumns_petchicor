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
exports.getDatabase = exports.initDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let _db = null; // Correct type here
const initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // Open the SQLite database (or create it if it doesn't exist)
    _db = yield (0, sqlite_1.open)({
        filename: './myDatabase.db', // Database file (use relative path or absolute path as required)
        driver: sqlite3_1.default.Database,
    });
    console.log('Database initialized');
    // Create users table if it doesn't exist
    yield _db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    );
  `);
    // Create courses table if it doesn't exist
    yield _db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      instructor TEXT,
      credits INTEGER,
      semester TEXT
    );
  `);
    console.log('Tables created or verified');
});
exports.initDatabase = initDatabase;
// Expose the database connection (for use in other parts of your application)
const getDatabase = () => {
    if (!_db) {
        throw new Error('Database not initialized. Call initDatabase first.');
    }
    console.log("Got database");
    return _db;
};
exports.getDatabase = getDatabase;

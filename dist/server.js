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
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // Middleware to parse JSON requests
app.use(express_1.default.static('src/public')); // Serve static files from public directory
let db;
const initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db = yield (0, database_1.openDatabase)();
        yield (0, database_1.createTable)(db);
    }
    catch (error) {
        console.error('Failed to initialize the database:', error);
    }
});
// API route to get all users
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, database_1.getUsers)(db);
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}));
// API route to insert a new user
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    try {
        yield (0, database_1.insertUser)(db, name, age);
        res.status(201).send('User created');
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error inserting user');
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    initDatabase(); // Initialize the database on server start
});

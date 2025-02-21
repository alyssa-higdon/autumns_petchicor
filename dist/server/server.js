"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./database/index");
const users_1 = __importDefault(require("./routes/users"));
const courses_1 = __importDefault(require("./routes/courses"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware for parsing JSON bodies
app.use(body_parser_1.default.json());
// Initialize the database
(0, index_1.initDatabase)().then(() => {
    console.log('Database initialized');
});
// Serve static files from the 'client' directory (HTML, CSS, JS)
app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
// API routes for users and courses
app.use('/api/users', users_1.default);
app.use('/api/courses', courses_1.default);
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

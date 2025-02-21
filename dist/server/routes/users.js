"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/routes/users.ts
const express_1 = __importDefault(require("express"));
const users_1 = require("../database/users");
const router = express_1.default.Router();
// Get all users
router.get('/', (req, res) => {
    const users = (0, users_1.getUsers)();
    res.json(users);
});
// Insert a new user
router.post('/', (req, res) => {
    const { name, age } = req.body;
    (0, users_1.insertUser)(name, age);
    res.status(201).json({ message: 'User created successfully' });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/routes/courses.ts
const express_1 = __importDefault(require("express"));
const courses_1 = require("../database/courses");
const router = express_1.default.Router();
// Get all college courses
router.get('/', (req, res) => {
    const courses = (0, courses_1.getCourses)();
    res.json(courses);
});
// Insert a new college course
router.post('/', (req, res) => {
    const { name, instructor, credits, semester } = req.body;
    (0, courses_1.insertCourse)(name, instructor, credits, semester);
    res.status(201).json({ message: 'Course created successfully' });
});
exports.default = router;

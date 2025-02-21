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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = exports.insertCourse = void 0;
// src/server/database/courses.ts
const index_1 = require("./index");
// Insert a course into the courses table
const insertCourse = (name, instructor, credits, semester) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, index_1.getDatabase)();
    yield db.run('INSERT INTO courses (name, instructor, credits, semester) VALUES (?, ?, ?, ?)', [name, instructor, credits, semester]);
    console.log(`Course ${name} inserted into the database`);
});
exports.insertCourse = insertCourse;
const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, index_1.getDatabase)();
    const res = yield db.all('SELECT * FROM courses');
    return res.map((row) => ({
        id: row.id,
        name: row.name,
        instructor: row.instructor,
        credits: row.credits,
        semester: row.semester,
    }));
});
exports.getCourses = getCourses;

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
var _a, _b;
// src/client/script.ts
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/users');
    const users = yield response.json();
    displayUsers(users);
});
const addUser = (name, age) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    });
    const result = yield response.json();
    console.log(result.message);
    fetchUsers(); // Re-fetch users after adding a new one
});
const fetchCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/courses');
    const courses = yield response.json();
    displayCourses(courses);
});
const addCourse = (name, instructor, credits, semester) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, instructor, credits, semester }),
    });
    const result = yield response.json();
    console.log(result.message);
    fetchCourses(); // Re-fetch courses after adding a new one
});
// Display functions
function displayUsers(users) {
    const usersContainer = document.getElementById('usersContainer');
    if (usersContainer) {
        usersContainer.innerHTML = users.map(user => `<div>${user.name}, ${user.age} years old</div>`).join('');
    }
}
function displayCourses(courses) {
    const coursesContainer = document.getElementById('courseesContainer');
    if (coursesContainer) {
        coursesContainer.innerHTML = courses.map(cls => `<div>${cls.name} - ${cls.instructor}, ${cls.credits} credits (${cls.semester})</div>`).join('');
    }
}
// Event Listeners
(_a = document.getElementById('userForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const age = parseInt(document.getElementById('userAge').value);
    addUser(name, age);
});
(_b = document.getElementById('courseForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('courseName').value;
    const instructor = document.getElementById('instructorName').value;
    const credits = parseInt(document.getElementById('credits').value);
    const semester = document.getElementById('semester').value;
    addCourse(name, instructor, credits, semester);
});
// Initial fetches
fetchUsers();
fetchCourses();

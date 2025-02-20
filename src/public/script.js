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
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const usersList = document.getElementById('usersList');
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('/api/users');
        const users = yield response.json();
        usersList.innerHTML = ''; // Clear the list before rendering
        users.forEach((user) => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.name}, Age: ${user.age}`;
            usersList.appendChild(li);
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }
});
const addUser = (name, age) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age }),
        });
        fetchUsers(); // Reload the list after adding a new user
    }
    catch (error) {
        console.error('Error adding user:', error);
    }
});
userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const age = parseInt(ageInput.value, 10);
    if (name && age) {
        addUser(name, age);
        nameInput.value = '';
        ageInput.value = '';
    }
});
fetchUsers(); // Load users initially when the page is loaded

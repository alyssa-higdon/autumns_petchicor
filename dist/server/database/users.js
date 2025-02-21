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
exports.getUsers = exports.insertUser = void 0;
// src/server/database/users.ts
const index_1 = require("./index");
// Insert a user into the users table
const insertUser = (name, age) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, index_1.getDatabase)();
    yield db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
    console.log(`User ${name} inserted into the database`);
});
exports.insertUser = insertUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, index_1.getDatabase)();
    const res = yield db.all('SELECT * FROM users');
    return res.map((row) => ({
        id: row.id,
        name: row.name,
        age: row.age,
    }));
});
exports.getUsers = getUsers;

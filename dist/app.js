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
const database_1 = require("./database");
const runApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Open the database connection
        const db = yield (0, database_1.openDatabase)();
        // Create the table if it doesn't exist
        yield (0, database_1.createTable)(db);
        // Insert some users
        yield (0, database_1.insertUser)(db, 'Alice', 25);
        yield (0, database_1.insertUser)(db, 'Bob', 30);
        // Fetch and log all users
        const users = yield (0, database_1.getUsers)(db);
        console.log('Users:', users);
        // Close the database connection
        yield (0, database_1.closeDatabase)(db);
    }
    catch (error) {
        console.error('Error in application:', error);
    }
});
// Run the application
runApp();

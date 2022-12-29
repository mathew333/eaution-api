"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermodel = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("./db");
let userschema = new mongoose_1.default.Schema({
    FirstName: {
        type: String,
        min: 5,
        max: 30,
        required: true
    },
    LastName: {
        type: String,
        min: 3,
        max: 25,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Pin: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});
exports.usermodel = mongoose_1.default.model('user', userschema, 'users');
(0, db_1.dbConnection)();
//# sourceMappingURL=userschema.js.map
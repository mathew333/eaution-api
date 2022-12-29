"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productbuyermodel = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("./db");
let productbuyerschema = new mongoose_1.default.Schema({
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
    productId: {
        type: String,
        required: true
    },
    BidAmount: {
        type: Number,
        required: true
    },
});
exports.productbuyermodel = mongoose_1.default.model('productbuyer', productbuyerschema, 'productbuyer');
(0, db_1.dbConnection)();
//# sourceMappingURL=productbuyerschema.js.map
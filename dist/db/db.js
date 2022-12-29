"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
var url = "mongodb://localhost:27017/e-auction";
mongoose_1.default.connect(url);
let dbConnection = async function () {
    console.log('Database Created!');
    return await mongoose_1.default.connection;
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=db.js.map
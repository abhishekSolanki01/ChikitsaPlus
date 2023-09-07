"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
// app.use('/admin', adminRoutes)
//server run 
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT + process.env.MONGO_URI);
});
//@ts-ignore
mongoose_1.default.connect(process.env.MONGO_URI, { dbNAme: 'chikitsa' });

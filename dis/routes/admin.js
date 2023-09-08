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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../models/admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET || "";
const router = express_1.default.Router();
/**
 *
 */
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield admin_1.Admin.findOne({ userName });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new admin_1.Admin({ userName, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
exports.default = router;

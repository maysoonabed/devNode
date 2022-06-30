"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const errorMiddleware_1 = __importDefault(require("../../../core/errorMiddleware"));
const rules = [
    (0, express_validator_1.body)('firstName')
        .isLength({ min: 4, max: 20 }),
    (0, express_validator_1.body)('lastName')
        .isLength({ min: 4, max: 20 }),
    // body('email')
    //     .isEmail().withMessage('invalid email').bail()
    //     .normalizeEmail()
    //     .custom(async (email) => {
    //         const user = await findByEmail(email)
    //         if (user) {
    //             return Promise.reject('email already exists')
    //         }
    //         return Promise.resolve()
    //     }),
    (0, express_validator_1.body)('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('password should be at least 8 characters, 1 lowercase, 1 uppercase, 1 symbols, 1 numbers')
];
exports.default = (0, errorMiddleware_1.default)(rules);

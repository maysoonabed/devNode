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
exports.findByEmail = exports.login = exports.create = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = require("../../errors/ApiError");
// import emailQueue from '../../queues/emails.js'
// import fibonacciQueue from '../../queues/cpu-intensive-task.js'
const create = (reqUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_1.default.findOne({ email: reqUser.email });
    if (userExists) {
        throw ApiError_1.ApiError.duplicate('user email already taken');
    }
    const hash = yield bcrypt_1.default.hash(reqUser.password, 3);
    const user = yield User_1.default.create({ email: reqUser.email, password: hash, firstName: reqUser.firstName, lastName: reqUser.lastName });
    const obj = { user, emailTemplate: '' };
    // emailQueue.add(obj)
    // fibonacciQueue.add(8)
    return user;
});
exports.create = create;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findByEmail)(email);
    if (!user)
        return Promise.reject('incorrect email or password');
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch)
        return Promise.reject('incorrect email or password');
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email
    }, fs_1.default.readFileSync('../../../privateKey'), { algorithm: 'RS256' });
    return token;
});
exports.login = login;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email });
});
exports.findByEmail = findByEmail;

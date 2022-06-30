"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.remove = exports.update = exports.findById = exports.findUserLikes = exports.find = exports.login = exports.create = void 0;
const User_1 = __importDefault(require("../../models/User"));
const service = __importStar(require("./service"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        const reqUser = { email, password, firstName, lastName };
        const user = yield service.create(reqUser);
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield service.login({ email, password });
        res.send({ token });
    }
    catch (error) {
        res.send(error.message);
    }
});
exports.login = login;
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find().lean();
    return res.send(users);
});
exports.find = find;
const findUserLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.default.aggregate([{
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(req.userId)
            }
        },
        {
            $project: {
                password: 0
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'user_id',
                as: 'like'
            }
        },
        // {
        //     $addFields: {
        //         count: { $size: "$like" }
        //     }
        // },
        {
            $unwind: '$like'
        },
        {
            $lookup: {
                from: 'contents',
                localField: 'like.post_id',
                foreignField: '_id',
                as: 'post'
            }
        },
        {
            $unwind: '$post'
        },
        {
            $project: {
                'like.post_id': 0,
                'like.user_id': 0,
                'like.__v': 0,
                'post.__v': 0
            }
        },
        {
            $count: 'count'
        }
    ]);
    return res.send(result);
});
exports.findUserLikes = findUserLikes;
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ _id: req.params.id }).lean();
    // const user = await User.findById(req.id)
    return res.send(user);
});
exports.findById = findById;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.body);
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await User.deleteOne({ _id: req.params.id })
    // res.status(204).send()
    const user = yield User_1.default.findById(req.params.id);
    if (!user) {
        throw new Error('user not found');
    }
    yield user.delete();
    res.status(204).send();
});
exports.remove = remove;

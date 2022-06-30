"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./core/db"));
const ApiError_1 = require("./errors/ApiError");
const routes_1 = __importDefault(require("./modules/user/routes"));
const response_time_1 = __importDefault(require("response-time"));
(0, db_1.default)().then(() => {
    const app = (0, express_1.default)();
    const port = 3100;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, response_time_1.default)((req, res, time) => {
        console.log(`Method ${req.method} What ${req.headers.host}${req.url} How ${res.statusCode} ResponseTime ${time}`);
    }));
    app.use('/users', routes_1.default);
    app.use((err, req, res, next) => {
        if (err instanceof ApiError_1.ApiError) {
            return res.status(err.code).json(err);
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        });
    });
    app.listen(port, () => {
        console.log(`app is listening at port ${port}`);
    });
}).catch(err => {
    console.log('could not connect to the database', err);
});

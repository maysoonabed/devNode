"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static serverError(message) {
        return new ApiError(500, message);
    }
    static duplicate(message) {
        return new ApiError(409, message);
    }
}
exports.ApiError = ApiError;
class ApiError {
    constructor(public code: number, public message: string) {
    }

    static badRequest(message: string): ApiError {
        return new ApiError(400, message)
    }

    static serverError(message: string): ApiError {
        return new ApiError(500, message)
    }

    static duplicate(message: string): ApiError {
        return new ApiError(409, message)
    }
}

export { ApiError }
import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { availableBook } from '../service.js'

const rules = [
    param('id')
    .isMongoId().withMessage('story id is not a valid mongo id')
    .custom(async (book_id, { req }) => {
        const available = await availableBook(book_id)
        if (!available) return Promise.reject('The book is not available')

        return true
    })
]

export default validate(rules)
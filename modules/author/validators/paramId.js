import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { availableAuthor } from '../service.js'

const rules = [
    param('id')
    .isMongoId().withMessage('story id is not a valid mongo id')
    .custom(async (author_id, { req }) => {
        const available = await availableAuthor(author_id)
        if (!available) return Promise.reject('There is no such author')

        return true
    })
]

export default validate(rules)
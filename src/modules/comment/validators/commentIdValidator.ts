import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findById } from '../service'

const rules = [
    param('id')
    .isMongoId().withMessage('Comment Id is not a valid mongo id')
    .custom(async (comment_id, { req }) => {
        const available = await findById(comment_id)
        if (!available) return Promise.reject('the comment is not available')
        return true
    })
]

export default validate(rules)
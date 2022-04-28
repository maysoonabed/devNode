import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    param('id')
    .isMongoId().withMessage('post id is not a valid mongo id')
    .custom(async (post_id, { req }) => {
        const is_liked_before = await isLikedBefore({ post_id, user_id: req.userId })
        if (is_liked_before) return Promise.reject('you already liked this post before')

        return true
    })
]

export default validate(rules)
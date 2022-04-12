import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    param('id')
        .if((value, { req }) => {
            if (req.method === "PUT") {
                // will validate
                return Promise.resolve()
            }
            // will not validate
            return Promise.reject('error')
        })
        // shortcut
        //.if((value, { req }) => req.method === "PUT")
        .exists().withMessage('id param is required')
        .isMongoId().withMessage('id param is not a valid Mongo id'),
    body('content')
        .isLength({ min: 4, max: 100 }),
    body('post_id')
        .optional()
        .isMongoId().withMessage('post id is not a valid mongo id')
        .custom(async value => {
            const post = await findById(value)
            if (!post) return Promise.reject('post not found')
            return true
        }).customSanitizer((value, { req }) => {
            if (req.body.type == 'post' && value) {
                return undefined
            }
            return value
        }),
    body('type')
        .exists({
            checkFalsy: true,
            checkNull: true
        }).withMessage('type is required').bail()
        .isIn(['post', 'comment'])
        .withMessage(`allowed values are: ${['post', 'comment']}`)
        .custom((value, { req }) => {
            if (value == 'comment' && !req.body.post_id) {
                throw new Error(`post_id is required`)
            }
            return true
        })
]

export default validate(rules)
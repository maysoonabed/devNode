import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    param('id')
        .isMongoId().withMessage('post id is not a valid mongo id')
]

export default validate(rules)
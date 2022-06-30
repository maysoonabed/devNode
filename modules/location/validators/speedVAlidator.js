import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    body('speed')
    .exists({
        checkFalsy: true,
        checkNull: true
    }).withMessage('speed is required').bail()
    .isNumeric()
    .withMessage(`speed should be a number`)
]

export default validate(rules)
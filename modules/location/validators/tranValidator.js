import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    body('transportation')
    .exists({
        checkFalsy: true,
        checkNull: true
    }).withMessage('transportation are required').bail()
    .isIn(['walking', 'driving'])
    .withMessage(`allowed values are: ${['walking', 'driving']}`)
]

export default validate(rules)
import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'

const rules = [
    body('image')
    .isURL({}).withMessage('image should be of a valid URL')
]

export default validate(rules)
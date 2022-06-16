import { query } from 'express-validator'
import validate from '../../../core/errorMiddleware'

const rules = [
    query('skip')
    .optional()
    .isInt()
    .withMessage('Skip must be a integer number'),
]

export default validate(rules)
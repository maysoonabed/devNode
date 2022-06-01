import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findByEmail } from '../service'
const rules = [
    body('name')
    .isLength({ min: 3 }),
    body('dateTime')
    .isAfter(new Date().toISOString())
    .withMessage('Interview should have a future date')
]

export default validate(rules)
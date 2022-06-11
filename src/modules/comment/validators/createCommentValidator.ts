import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'

const rules = [
    body('content')
    .exists({
        checkFalsy: true,
        checkNull: true
    })
    .withMessage('Content is required')
]

export default validate(rules)
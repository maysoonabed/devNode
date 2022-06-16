import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'

const rules = [
    body('stage')
    .custom((value, { req }) => {
        if (!req.workflow.includes(value)) return Promise.reject(`Stages allowed values are: ${req.workflow}`)
        return true
    })
    .withMessage('Invalid Stage'),
]

export default validate(rules)
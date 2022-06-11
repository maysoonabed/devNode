import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'

const rules = [
    body('workflow')
    .optional()
    .isArray()
    .withMessage('Workflow should be an array '),
    body('workflow.*')
    .isIn(["TODO", "InProgress", "CodeReview", "ReadyForTesting", "ReadyForProduction"])
    .withMessage(`Stages allowed values are: ${["TODO", " InProgress", " CodeReview", " ReadyForTesting", " ReadyForProduction"]}`)

]

export default validate(rules)
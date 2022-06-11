import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'

const rules = [
    body('name')
    .exists({
        checkFalsy: true,
        checkNull: true
    })
    .withMessage('Name is required'),
    body('workflow')
    .exists({
        checkFalsy: true,
        checkNull: true
    })
    .withMessage('Workflow is required')
    .bail()
    .isArray()
    .withMessage('Workflow should be an array ')
    .bail()
    .custom(async (wf, { req }) => {
        const set = new Set(wf)
        if (set.size < 3) return Promise.reject('Workflow should have at least 3 stages')
        return true
    }),
    body('workflow.*')
    .isIn(["TODO", "InProgress", "CodeReview", "ReadyForTesting", "ReadyForProduction"])
    .withMessage(`Stages allowed values are: ${["TODO", " InProgress", " CodeReview", " ReadyForTesting", " ReadyForProduction"]}`)

]

export default validate(rules)
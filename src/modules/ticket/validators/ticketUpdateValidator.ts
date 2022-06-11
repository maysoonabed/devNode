import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findById } from '../service'
import { findById as findUser } from '../../user/service'

const rules = [
    body('assignee')
    .optional()
    .isMongoId().withMessage('user id is not a valid mongo id')
    .custom(async value => {
        const user = await findUser(value)
        if (!user) return Promise.reject('user not found')
        return true
    })
    .withMessage(`user not found`),
    body('stage')
    .optional()
    .custom((value, { req }) => {
        if (!req.workflow.includes(value)) return Promise.reject('Invalid Stage')
        return true
    })
    .withMessage('Invalid Stage'),
    body('type')
    .optional()
    .isIn(["bug", "story"])
    .withMessage(`Type allowed values are: ${["bug", " story"]}`)
    .custom(async (value, { req }) => {
        const ticket = await findById(req.params.id)
        if (value == 'bug' && !ticket.severity && !req.body.severity) {
            return Promise.reject(`Severity must be included`)
        }
        return true
    }).withMessage(`Severity must be included`),
    body('severity')
    .optional()
    .custom(async (value, { req }) => {
        const ticket = await findById(req.params.id)
        const type = req.body.type || ticket.type
        if (type == 'bug') {
            if (!["Blocker", "Critical", "Major", "Minor", "Trivial"].includes(value))
                return Promise.reject(`Severity allowed values are: ${["Blocker", "Critical", "Major", "Minor", "Trivial"]}`)
        }
        return true

    }).withMessage(`Severity allowed values are: ${["Blocker", "Critical", "Major", "Minor", "Trivial"]}`)
    .customSanitizer((value, { req }) => {
        if (req.body.type == 'story') {
            return undefined
        }
        return value
    }),

]

export default validate(rules)
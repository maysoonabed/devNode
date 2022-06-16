import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findById } from '../service'
import { findByEmail as findUser } from '../../user/service'

const rules = [
    body('name')
    .exists({
        checkFalsy: true,
        checkNull: true
    })
    .withMessage('Name is required'),
    body('parentTicket')
    .optional()
    .isMongoId().withMessage('ticket id is not a valid mongo id')
    .custom(async value => {
        const ticket = await findById(value)
        if (!ticket) return Promise.reject('ticket not found')
        return true
    }),
    body('assignee')
    .isEmail().withMessage('user email is not a valid email').bail()
    .custom(async value => {
        const user = await findUser(value)
        if (!user) return Promise.reject('user not found')
        return true
    }),
    body('type')
    .isIn(["bug", "story"])
    .withMessage(`Type allowed values are: ${["bug", " story"]}`),
    body('severity')
    .custom(async (value, { req }) => {
        if (req.body.type == 'story' && value) {
            req.body.severity = undefined
        } else {
            if (!value) return Promise.reject('Severity is required for type bug')
            if (!["Blocker", "Critical", "Major", "Minor", "Trivial"].includes(value))
                return Promise.reject(`Severity allowed values are: ${["Blocker", "Critical", "Major", "Minor", "Trivial"]}`)
        }
        return true
    })

]

export default validate(rules)
import { validationResult } from 'express-validator'

export default function validate(rules) {
    return [...rules, async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ validation_errors: errors.array() })
        }
        next()
    }]
}
import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    param('id')
    .exists().withMessage('id param is required').bail()
    .isMongoId().withMessage('id param is not a valid Mongo id')
    .custom(async value => {
        const location = await findById(value)
        if (!location) return Promise.reject('location not found')
        return true
    }),
    body('coordinates')
    .isLatLong().withMessage('the coordinates is not a valid latitude-longitude coordinate'),
]

export default validate(rules)
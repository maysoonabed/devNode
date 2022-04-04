import { param, body, validationResult } from 'express-validator'
import validate from './errorMiddleware.js'

const rules = [
    param('id')
        .if((value, { req }) => {
            if (req.method === 'POST') {
                return Promise.reject()
            }
            return Promise.resolve()
        }).exists().withMessage('id param is required'),
    body('email')
        .contains('@').withMessage(`doesn't contain @`).bail()
        .isEmail().withMessage('invalid email').bail()
        .normalizeEmail(),
    body('date')
        .isAfter('10-04-2022').withMessage('date should be after some date'),
    body('password')
        // .isWhitelisted(['a', 'b']).withMessage('contains characters that are not allowed')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('password should be at least 8 characters, 1 lowercase, 1 uppercase, 1 symbols, 1 numbers'),
    body('address')
        .exists({
            checkNull: true,
            checkFalsy: true
        }).withMessage('address is required').bail()
        .isAlpha().withMessage('address must be a valid alpha character'),
    body('currency')
        .isCurrency({
            symbol_after_digits: true
        }),
    body('data_uri')
        .isDataURI(),
    body('date_of_birth')
        .isDate().withMessage('birth must be a valid date').bail()
        .isAfter("2010-07-15").withMessage('must be greater than or equal to 2010-07-15'),
    body('color[*]')
        .isIn(['RED', 'GREEN', 'BLUE']).withMessage(`must be a value of the following ${['RED', 'GREEN', 'BLUE']}`),
    body().isJSON({ allow_primitives: true }).withMessage('invalid json'),
    param('id').isMongoId().withMessage('must be a Mongo id'),
    body('url')
        .isURL().withMessage('must be a valid url')
]

export default validate(rules)
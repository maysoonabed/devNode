import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { availableAuthor, findByISBN } from '../service.js'


const rules = [
    body('name')
    .exists({
        checkFalsy: true,
        checkNull: true
    }).withMessage('Name is required'),
    body('author_id')
    .isMongoId().withMessage('author id is not a valid mongo id')
    .custom(async author_id => {
        const author = await availableAuthor(author_id)
        if (!author) return Promise.reject('author not found')

        return true
    }),
    body('book_cover_image')
    .isURL({}).withMessage('image should be of a valid URL.'),
    body('ISBN')
    .isISBN().withMessage('isISBN should be of a valid ISBN (version 10 or 13).')
    .custom(async (ISBN) => {
        const book = await findByISBN(ISBN)
        if (book) {
            return Promise.reject('ISBN should be unique')
        }
        return Promise.resolve()
    })
]

export default validate(rules)
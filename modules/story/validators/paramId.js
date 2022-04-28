import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { availableStory } from '../service.js'

const rules = [
    param('id')
    .isMongoId().withMessage('story id is not a valid mongo id')
    .custom(async (story_id, { req }) => {
        const available = await availableStory({ story_id })
        if (!available) return Promise.reject('the Story is not available')

        return true
    })
]

export default validate(rules)
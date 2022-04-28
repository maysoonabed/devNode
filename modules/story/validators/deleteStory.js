import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { authorizedStory } from '../service.js'

const rules = [
    param('id')
    .custom(async (story_id, { req }) => {
        const authorized = await authorizedStory({ story_id, user_id: req.userId })
        if (!authorized) return Promise.reject('You do not have the permision to delete this story')
        return true
    })
]

export default validate(rules)
import express from 'express';
const router = express.Router()
import createAuthorValidator from './validators/createAuthor.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'

router.get('/', controller.find)

router.get('/:id', paramIdValidator, controller.viewAuth)

router.post('/', createAuthorValidator, controller.create)

router.post('/:id/view', controller.viewStory)


export default router
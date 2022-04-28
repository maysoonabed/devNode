import express from 'express';
const router = express.Router()
import createStoryValidator from './validators/createStory.js'
import deleteStoryValidator from './validators/deleteStory.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'

router.get('/', controller.find)

router.use(authenticationMiddleware)

router.post('/', createStoryValidator, controller.create)

router.post('/:id/view', paramIdValidator, controller.viewStory)

router.delete('/:id', paramIdValidator, deleteStoryValidator, controller.remove)

export default router
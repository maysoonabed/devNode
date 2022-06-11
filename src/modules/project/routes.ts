import express from 'express';
const router = express.Router()
import createProjectValidator from './validators/createProjectValidator'
import projectUpdateValidator from './validators/projectUpdateValidator'
import projectIdValidator from './validators/projectIdValidator'

import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'


router.use(authenticationMiddleware)

router.post('/', createProjectValidator, controller.create) //

router.get('/', controller.find)

router.get('/:id', projectIdValidator, controller.findById)

router.delete('/:id', projectIdValidator, controller.deleteById)

router.patch('/:id', projectIdValidator, projectUpdateValidator, controller.update)

export default router
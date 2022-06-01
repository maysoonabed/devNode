import express from 'express';
const router = express.Router()
import createUserValidator from './validators/createUserValidator'
import interviewValidator from './validators/interviewValidator'

import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'

router.post('/signup', createUserValidator, controller.create)

router.post('/login', controller.login)

router.get('/', controller.find)

router.use(authenticationMiddleware)

router.get('/:id', controller.findById)

router.patch('/:id', controller.activate)

router.post('/interview', interviewValidator, controller.addInterview)

export default router
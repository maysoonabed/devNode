import express from 'express';
const router = express.Router()
import createUserValidator from './validators/createUserValidator'
import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'

router.post('/signup', createUserValidator, controller.create)

router.post('/login', controller.login)

router.get('/', controller.find)

router.use(authenticationMiddleware)

router.get('/:id', controller.findById)


export default router
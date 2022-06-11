import express from 'express';
const router = express.Router()
import createCommentValidator from './validators/createCommentValidator'
import commentIdValidator from './validators/commentIdValidator'

import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'


router.use(authenticationMiddleware)

router.post('/', createCommentValidator, controller.create) //

router.get('/:id', commentIdValidator, controller.findById)

router.delete('/:id', commentIdValidator, controller.deleteById)

router.patch('/:id', commentIdValidator, createCommentValidator, controller.update)

export default router
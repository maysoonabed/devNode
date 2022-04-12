import express from 'express';
const router = express.Router()
import createPostValidator from './validators/createPost.js'
import createLikeValidator from './validators/createLike.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'

router.use(authenticationMiddleware)

router.post('/', createPostValidator, controller.create)

router.post('/:id/like', paramIdValidator, createLikeValidator, controller.like)

router.get('/', controller.find)

router.get('/:id', paramIdValidator, controller.findById)

router.put('/:id', createPostValidator, controller.create)

router.delete('/:id', paramIdValidator, controller.remove)

export default router
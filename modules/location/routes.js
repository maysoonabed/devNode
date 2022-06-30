import express from 'express';
const router = express.Router()
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import distanceValidator from './validators/distanceValidator.js'
import speedVAlidator from './validators/speedVAlidator.js'
import tranValidator from './validators/tranValidator.js'

// router.use(authenticationMiddleware)

router.post('/', controller.create)

router.get('/', controller.find)

router.get('/:id/distance', distanceValidator, tranValidator, controller.getDistance)

router.get('/:id/speed', distanceValidator, speedVAlidator, controller.getTime)

export default router
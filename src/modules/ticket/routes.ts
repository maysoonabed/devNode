import express from 'express';
const router = express.Router()
import createTicketValidator from './validators/createTicketValidator'
import ticketUpdateValidator from './validators/ticketUpdateValidator'
import ticketIdValidator from './validators/ticketIdValidator'
import ticketStageValidator from './validators/ticketStageValidator'
import skipValidator from './validators/skipValidator'

import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'


router.use(authenticationMiddleware)

router.post('/', createTicketValidator, controller.create) //

router.get('/', controller.find)

router.get('/advancedSearch', skipValidator, controller.advancedSearch)

router.get('/groupStage', skipValidator, controller.groupStage)

router.get('/:id', ticketIdValidator, controller.findById)

router.delete('/:id', ticketIdValidator, controller.deleteById)

router.patch('/:id', ticketIdValidator, ticketUpdateValidator, controller.update)

router.patch('/:id/stage', ticketIdValidator, ticketStageValidator, controller.updateStage)

export default router
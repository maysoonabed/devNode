import express from 'express';
const router = express.Router()
import createTicketValidator from './validators/createTicketValidator'
import ticketUpdateValidator from './validators/ticketUpdateValidator'
import ticketIdValidator from './validators/ticketIdValidator'

import * as controller from './controller'
import authenticationMiddleware from '../../middlewares/authentication'


router.use(authenticationMiddleware)

router.post('/', createTicketValidator, controller.create) //

router.get('/', controller.find)

router.get('/:id', ticketIdValidator, controller.findById)

router.delete('/:id', ticketIdValidator, controller.deleteById)

router.patch('/:id', ticketIdValidator, ticketUpdateValidator, controller.update)

export default router
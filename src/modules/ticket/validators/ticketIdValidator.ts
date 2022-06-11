import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findById } from '../service'

const rules = [
    param('id')
    .isMongoId().withMessage('Ticket Id is not a valid mongo id')
    .custom(async (ticket_id, { req }) => {
        const available = await findById(ticket_id)
        if (!available) return Promise.reject('the Ticket is not available')
        req.workflow = available.workflow
        req.ticketId = ticket_id

        return true
    })
]

export default validate(rules)
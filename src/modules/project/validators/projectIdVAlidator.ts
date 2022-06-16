import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware'
import { findById } from '../service'

const rules = [
    param('id')
    .isMongoId().withMessage('Project Id is not a valid mongo id')
    .custom(async (priject_id, { req }) => {
        const available = await findById(priject_id)
        if (!available) return Promise.reject('the Project is not available')
        req.workflow = available.workflow
        req.projectId = priject_id
        return true
    }).withMessage('the Project is not available')
]

export default validate(rules)
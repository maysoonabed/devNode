import express from 'express';
const router = express.Router()
import createBookValidator from './validators/createBook.js'
import paramIdValidator from './validators/paramId.js'

import * as controller from './controller.js'

router.get('/', controller.find)

router.get('/:id', paramIdValidator, controller.viewBook)

router.post('/', createBookValidator, controller.create)



export default router
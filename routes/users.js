import express from 'express';
const router = express.Router()
import User from '../models/User.js'

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.create({ email, password })
    res.send(user)
})

router.get('/', async (req, res) => {
    const users = await User.find()
    return res.send(users)
})

router.get('/:id', async (req, res) => {
    // const user = await User.findOne({ _id: req.params.id })
    const user = await User.findById(req.id)
    return res.send(user)
})

router.put('/:id', async (req, res) => {
    
})

router.delete('/:id', async (req, res) => {
    // await User.deleteOne({ _id: req.params.id })
    // res.status(204).send()

    const user = User.findById(req.params.id)
    if (!user) {
        throw new Error('user not found')
    }
    user.delete()
    res.status(204).send()
})

router.patch('/:id', (req, res) => {

})

export default router
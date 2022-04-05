import User from '../../models/User.js'
import * as service from './service.js'

export const create = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    const user = await service.create({ email, password, firstName, lastName })
    res.send(user)
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await service.login({ email, password })
        res.send({ token })
    } catch (error) {
        res.send(error.message)
    }
}

export const find = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}

export const findById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    // const user = await User.findById(req.id)
    return res.send(user)
}

export const update = async (req, res) => {
    res.send(req.body)
}

export const remove = async (req, res) => {
    // await User.deleteOne({ _id: req.params.id })
    // res.status(204).send()

    const user = User.findById(req.params.id)
    if (!user) {
        throw new Error('user not found')
    }
    user.delete()
    res.status(204).send()
}
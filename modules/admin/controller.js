import * as service from './service.js'

export const create = async (req, res) => {
    const { email, password, firstName, lastName, roles } = req.body
    const admin = await service.create({ email, password, firstName, lastName, roles })
    res.send(admin)
}

export const find = async (req, res) => {
    const admins = await service.find()
    res.send(admins)
}
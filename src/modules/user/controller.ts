import User from '../../models/User'
import * as service from './service'
import mongoose from 'mongoose'
import { IUser, RUser } from '../../interfaces/IUser'
import { IReq } from '../../interfaces/IRequest'

import Express from 'express';
import { ApiError } from '../../errors/ApiError';

export const create = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const reqUser: RUser = { email, password, firstName, lastName }
        const user = await service.create(reqUser)
        res.send(user)
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body
    try {
        const token = await service.login({ email, password })
        res.send({ token })
    } catch (error) {
        res.send(error.message)
    }
}

export const find = async (req, res) => {
    const users = await User.find().lean()
    return res.send(users)
}


export const findById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).lean()
    // const user = await User.findById(req.id)
    return res.send(user)
}

export const update = async (req, res) => {
    res.send(req.body)
}

export const remove = async (req, res) => {
    // await User.deleteOne({ _id: req.params.id })
    // res.status(204).send()

    const user: IUser = await User.findById(req.params.id)
    if (!user) {
        throw new Error('user not found')
    }
    await user.delete()
    res.status(204).send()
}
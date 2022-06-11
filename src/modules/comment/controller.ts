import Ticket from '../../models/Ticket'
import * as service from './service'
import mongoose from 'mongoose'
import { IReq } from '../../interfaces/IRequest'
import { IComment, RComment } from '../../interfaces/IComment'

import Express from 'express';
import { ApiError } from '../../errors/ApiError';



export const create = async (req: IReq, res: Express.Response, next: Express.NextFunction) => {
    const { content } = req.body
    try {
        const reqComment: RComment = { content, userId: req.userId, ticketId: req.ticketId }
        const comment = await service.create(reqComment)
        res.send(comment)
    } catch (error) {
        next(error)
    }
}


export const findById = async (req, res, next) => {
    try {
        const comment = await service.findById(req.params.id)
        res.send(comment)
    } catch (error) {
        next(error)
    }
}



export const deleteById = async (req, res, next) => {
    try {
        await service.deleteById(req.params.id)
        return res.status(204).send("Comment deleted successfully")
    } catch (error) {
        next(error)
    }

}


export const update = async (req, res, next) => {
    const { content } = req.body
    try {
        const comment = await service.update({ id: req.params.id, content })
        return res.send(comment)
    } catch (error) {
        next(error)
    }
}
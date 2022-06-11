import Ticket from '../../models/Ticket'
import * as service from './service'
import mongoose from 'mongoose'
import { IReq } from '../../interfaces/IRequest'
import { ITicket, RTicket } from '../../interfaces/ITicket'

import Express from 'express';
import { ApiError } from '../../errors/ApiError';



export const create = async (req: IReq, res: Express.Response, next: Express.NextFunction) => {
    const { name, description, assignee, type, stage, severity, parentTicket } = req.body
    try {
        const reqTicket: RTicket = { name, userId: req.userId, description, assignee, workflow: req.workflow, type, stage, severity, parentTicket, project: req.projectId }
        const ticket = await service.create(reqTicket)
        res.send(ticket)
    } catch (error) {
        next(error)
    }
}


export const findById = async (req, res, next) => {
    try {
        const ticket = await service.findById(req.params.id)
        res.send(ticket)
    } catch (error) {
        next(error)
    }
}


export const find = async (req, res, next) => {
    const { text, stage, type, assignee, project, limit, skip } = req.query
    try {
        const ticket = await service.searchTicket({ text, stage, type, assignee, project, limit, skip })
        return res.send(ticket)
    } catch (error) {
        next(error)
    }
}


export const deleteById = async (req, res, next) => {
    try {
        await service.deleteById({ id: req.params.id, userId: req.userId })
        return res.status(204).send('ticket deleted successfully')
    } catch (error) {
        next(error)
    }

}


export const update = async (req, res, next) => {
    const { name, description, assignee, type, stage, severity } = req.body
    try {
        const ticket = await service.update({ id: req.params.id, userId: req.userId, name, description, assignee, type, stage, severity })
        return res.send(ticket)
    } catch (error) {
        next(error)
    }
}
import Project from '../../models/Project'
import * as service from './service'
import mongoose from 'mongoose'
import { IProject, RProject } from '../../interfaces/IProject'
import { IReq } from '../../interfaces/IRequest'

import Express from 'express';
import { ApiError } from '../../errors/ApiError';

export const create = async (req: IReq, res: Express.Response, next: Express.NextFunction) => {
    const { name, workflow } = req.body
    try {
        const reqProject: RProject = { name, workflow }
        const project = await service.create(reqProject)
        res.send(project)
    } catch (error) {
        next(error)
    }
}


export const findById = async (req, res, next) => {
    try {
        const project = await service.findById(req.params.id)
        res.send(project)
    } catch (error) {
        next(error)
    }
}

export const find = async (req, res, next) => {
    const { name, limit, skip } = req.query
    try {
        const project = await service.searchProject({ name, limit, skip })
        return res.send(project)
    } catch (error) {
        next(error)
    }
}


export const deleteById = async (req, res, next) => {
    try {
        await service.deleteById(req.params.id)
        return res.status(204).send('deleted successfully')
    } catch (error) {
        next(error)
    }

}


export const update = async (req, res, next) => {
    const { name, workflow } = req.body
    try {
        const project = await service.update({ id: req.params.id, name, workflow })
        return res.send(project)
    } catch (error) {
        next(error)
    }
}
import Ticket from '../../models/Ticket'
import Story from '../../models/Story'
import Bug from '../../models/Bug'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { ITicket, RTicket } from '../../interfaces/ITicket'
import { ApiError } from '../../errors/ApiError'
import { ObjectId } from 'mongoose'
import { logger } from '../../middlewares/logger'
import { groupBy, advanceSearch, deleteQuery } from '../../utils/elastic'


type Updates = {
    name ? : string;
    description ? : string;
    assignee ? : string;
    stage ? : string;
    severity ? : string;
    $unset ? : Object;
    updatedBy: string;
}

export const create = async (reqTicket: RTicket): Promise < ITicket > => {
    if (!reqTicket.stage) reqTicket.stage = reqTicket.stage[0]
    const ticket: ITicket = reqTicket.type == 'bug' ? await Bug.create(reqTicket) : await Story.create(reqTicket)
    return ticket
}

export const findById = async (id: string): Promise < ITicket > => {
    const ticket: ITicket = await Ticket.findById(id) //find deleted false
    if (!ticket || ticket.deleted == true) throw ApiError.notFound('no ticket found')
    return ticket
}
export const findByEmail = async (email: string): Promise < ITicket > => {
    const ticket: ITicket = await Ticket.findOne({ email, deleted: false }) //find deleted false
    if (!ticket) throw ApiError.notFound('no ticket found')
    return ticket
}

export const searchTicket = async ({ text, stage, type, assignee, project, limit = 10, skip = 0 }) => {
    let pipe = [];

    if (text)
        pipe.push({ $match: { $text: { $search: text } } });
    if (stage)
        pipe.push({ $match: { stage } })
    if (type)
        pipe.push({ $match: { type } })
    if (assignee)
        pipe.push({ $match: { assignee } })
    if (project)
        pipe.push({ $match: { project } })

    pipe.push({ $match: { deleted: false } });
    pipe.push({ $skip: Number(skip) });
    pipe.push({ $limit: Number(limit) });

    return await Ticket.aggregate(pipe)

}

export const advancedSearch = async ({ text, skip = 0, projectId }) => {
    const fields = ["assignee_info.fullName", "name", "description", "comments.content"]
    return await advanceSearch('tickets', skip, text, fields, projectId)

}
export const deleteById = async ({ id, userEmail }) => {
    try {
        await Ticket.delete({ $or: [{ _id: id }, { parentTicket: id }] }, userEmail);
        const query = {
            multi_match: {
                "query": id,
                "fields": ["_id", "parentTicket"]
            }
        }
        await deleteQuery(query, 'tickets')
    } catch (err) {
        if (!err.message.includes('Query was already executed'))
            throw ApiError.serverError(err.message)
    }
    logger.info(`Ticket ${id} and its subtickets were deleted by ${userEmail}`)

}

export const update = async ({ id, updatedBy, name, description, assignee, stage, severity }): Promise < ITicket > => {
    let updates: Updates = { updatedBy }
    if (name)
        updates.name = name
    if (description)
        updates.description = description
    if (stage)
        updates.stage = stage
    if (assignee)
        updates.assignee = assignee
    if (severity)
        updates.severity = severity
    try {
        const ticket: ITicket = await Ticket.findOneAndUpdate({ _id: id }, updates, { new: true })
        return ticket
    } catch (err) {
        throw ApiError.serverError('could not update the ticket')
    }
}

export const updateStage = async ({ id, updatedBy, stage }): Promise < ITicket > => {
    let updates: Updates = { updatedBy, stage }

    try {
        const ticket: ITicket = await Ticket.findOneAndUpdate({ _id: id }, updates, { new: true })
        return ticket
    } catch (err) {
        throw ApiError.serverError('could not update the ticket')
    }
}

export const aggregateById = async (id) => {
    const ticket = await Ticket.aggregate([{
            $match: {
                _id: id
            },
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project_info",
            },
        },
        {
            $unwind: {
                path: "$project_info",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignee",
                foreignField: "email",
                as: "assignee_info",
            },
        },
        {
            $unwind: {
                path: "$assignee_info",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "updatedBy",
                foreignField: "email",
                as: "updatedBy_info",
            },
        },
        {
            $unwind: {
                path: "$updatedBy_info",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "email",
                as: "createdBy_info",
            },
        },
        {
            $unwind: {
                path: "$createdBy_info",
            },
        },

        { $project: { "_id": 0, "__V": 0, "createdBy": 0, "updatedBy": 0, "assignee": 0, "project": 0 } }
    ])
    if (!ticket[0]) throw ApiError.notFound('no ticket found')
    return ticket[0]
}

export const groupStage = async (skip: number = 0, projectId) => {
    const res = await groupBy('tickets', skip, projectId);
    return res
}
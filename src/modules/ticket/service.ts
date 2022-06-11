import Ticket from '../../models/Ticket'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { ITicket, RTicket } from '../../interfaces/ITicket'
import { ApiError } from '../../errors/ApiError'
import { ObjectId } from 'mongoose'


type Updates = {
    name ? : string;
    description ? : string;
    assignee ? : ObjectId;
    type ? : string;
    stage ? : string;
    severity ? : string;
    $unset ? : Object;
    updatedBy: Object;

}

export const create = async (reqTicket: RTicket): Promise < ITicket > => {
    if (!reqTicket.stage) reqTicket.stage = reqTicket.stage[0]
    if (reqTicket.type !== 'bug')
        delete reqTicket.severity
    const ticket: ITicket = await Ticket.create(reqTicket)

    return ticket
}

export const findById = async (id: string): Promise < ITicket > => {
    const ticket: ITicket = await Ticket.findById(id)
    if (!ticket || ticket.deleted == true) throw ApiError.notFound('no ticket found')
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

export const deleteById = async ({ id, userId }) => {
    try {
        await Ticket.delete({ $or: [{ _id: id }, { parentTicket: id }] }, userId);
        return

    } catch (err) {
        return err
    }
}

export const update = async ({ id, userId, name, description, assignee, type, stage, severity }): Promise < ITicket > => {
    let updates: Updates = { updatedBy: userId }
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
    if (type) {
        updates.type = type
        if (type == "story")
            updates.$unset = { severity: 1 }
    }

    try {
        const ticket: ITicket = await Ticket.findOneAndUpdate({ _id: id }, updates, { new: true })
        return ticket
    } catch (err) {
        throw ApiError.serverError('could not update the ticket')
    }


}
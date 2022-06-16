import Comment from '../../models/Comment'
import Ticket from '../../models/Ticket'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { IComment, RComment } from '../../interfaces/IComment'
import { ApiError } from '../../errors/ApiError'
import { ObjectId } from 'mongoose'


export const create = async (reqComment: RComment): Promise < IComment > => {
    const comment: IComment = await Comment.create(reqComment)
    // transaction
    await Ticket.updateOne({ _id: reqComment.ticketId }, { $push: { comments: comment } }, //move to ticket module

    );
    return comment
}


export const findById = async (id: string): Promise < IComment > => {
    const comment: IComment = await Comment.findById(id)
    if (!comment) throw ApiError.notFound('no comment found')
    return comment
}


export const deleteById = async (id: string) => {
    const comment = await Comment.findOne({ _id: id });
    if (!comment || comment.deleted == true) {
        throw ApiError.notFound('no comment found')
    }
    //transaction
    Ticket.findOneAndUpdate({ _id: comment.ticketId }, { $pull: { comments: { _id: id } } }, { new: true }, function(err, data) {}); //move to ticket module

    await comment.delete()

    return
}

export const update = async ({ id, content }): Promise < IComment > => {
    try {
        // yet again transaction
        const comment: IComment = await Comment.findOneAndUpdate({ _id: id }, { content }, { new: true })
        const ticket = await Ticket.findOneAndUpdate({ _id: comment.ticketId }, { $set: { "comments.$[el].content": content } }, { //move to ticket module
            arrayFilters: [{ "el._id": id }],
            new: true
        })
        return comment
    } catch (err) {
        throw ApiError.serverError('could not update the comment')
    }


}
import Comment from '../../models/Comment'
import Ticket from '../../models/Ticket'
import mongoose from 'mongoose'
import { IComment, RComment } from '../../interfaces/IComment'
import { ApiError } from '../../errors/ApiError'
import { ObjectId } from 'mongoose'


export const create = async (reqComment: RComment): Promise < IComment > => {
    let comment: IComment
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        comment = await Comment.create(reqComment)
        if (!comment) {
            throw ApiError.badRequest('error adding comment')
        }
        await Ticket.updateOne({ _id: reqComment.ticketId }, { $push: { comments: comment } }, ); //move to ticket module
    })
    session.endSession()
    return comment
}


export const findById = async (id: string): Promise < IComment > => {
    const comment: IComment = await Comment.findById(id)
    if (!comment) throw ApiError.notFound('no comment found')
    return comment
}


export const deleteById = async (id: string, ticketId: string, userEmail: string) => {

    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        await Comment.delete({ _id: id }, userEmail);

        Ticket.findOneAndUpdate({ _id: ticketId }, { $pull: { comments: { _id: id } } }, { new: true }, function(err, data) {}); //move to ticket module

    })
    session.endSession()

    return
}

export const update = async ({ id, content }): Promise < IComment > => {
    let comment: IComment
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        comment = await Comment.findOneAndUpdate({ _id: id }, { content }, { new: true })
        if (!comment) {
            throw ApiError.badRequest('error in updating the comment')
        }
        const ticket = await Ticket.findOneAndUpdate({ _id: comment.ticketId, "comments._id": id }, { $set: { "comments.$.content": content } }, //move to ticket module
            //    arrayFilters: [{ "el._id": id }],
            {
                new: true
            })
    })
    session.endSession()
    return comment
}
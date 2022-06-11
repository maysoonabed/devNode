import { Document } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { ObjectId } from 'mongoose'

export interface RComment {
    content: string
    userId: ObjectId
    ticketId: ObjectId
}

export interface IComment extends RComment, Document, MongooseDelete.SoftDeleteDocument {

}
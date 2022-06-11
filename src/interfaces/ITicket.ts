import { Document } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { ObjectId } from 'mongoose'

export interface RTicket {
    name: string
    userId: ObjectId
    workflow: string[]
    description: string
    stage: string
    type: string
    severity ? : string
    assignee: ObjectId
    parentTicket ? : ObjectId
    project: ObjectId | String
    updatedAt ? : Date
    deletedAt ? : Date
    updatedBy ? : ObjectId
}

export interface ITicket extends RTicket, Document, MongooseDelete.SoftDeleteDocument {

}
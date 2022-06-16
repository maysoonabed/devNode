import { Document } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { ObjectId } from 'mongoose'
import { schemaComment } from '../models/Comment'

export interface RTicket {
    name: string
    createdBy: string
    workflow: string[]
    comments ? : schemaComment[]
    description: string
    stage: string
    type: string
    severity ? : string
    assignee: string
    parentTicket ? : ObjectId
    project: ObjectId | String
    updatedAt ? : Date
    deletedAt ? : Date
    updatedBy ? : string
}

export interface ITicket extends RTicket, Document, MongooseDelete.SoftDeleteDocument {

}
import { Document } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

export interface RProject {
    name: string
    workflow: string[]
}

export interface IProject extends RProject, Document, MongooseDelete.SoftDeleteDocument {

}
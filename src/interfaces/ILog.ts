import { Document } from 'mongoose'
import { ObjectId } from 'mongoose'

export enum Methods {
    GET = "GET",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE",
}
export interface RLog {
    who ? : ObjectId
    what: string
    method: Methods
    how: number
    responseTime: number
}

export interface ILog extends RLog, Document {

}
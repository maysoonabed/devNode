import { Request } from "express"
import { ObjectId } from 'mongoose'

export interface IReq extends Request {
    userId: ObjectId
    userEmail: string
    workflow ? : string[]
    projectId ? : ObjectId
    ticketId ? : ObjectId

}
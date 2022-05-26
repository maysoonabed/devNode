import { Request } from "express"
import { ObjectId } from 'mongoose'

export interface IReq extends Request {
    userId: ObjectId
}
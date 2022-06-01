import { Document } from 'mongoose'
import { ObjectId } from 'mongoose'

export interface RRem {
    to: ObjectId
    name: string
    dunno: String
    interval: number
    repeated: number
}


export interface IRem extends RRem, Document {

}
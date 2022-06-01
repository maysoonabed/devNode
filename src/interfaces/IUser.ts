import { Document } from 'mongoose'

export interface RUser {
    email: string
    password: string
    activated ? : boolean
    firstName ? : string
    middleName ? : string
    lastName: string
    fullName ? : string
}

export interface IUser extends RUser, Document {

}
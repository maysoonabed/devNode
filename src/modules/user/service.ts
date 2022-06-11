import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { IUser, RUser } from '../../interfaces/IUser'
import { ApiError } from '../../errors/ApiError'

export const create = async (reqUser: RUser): Promise < IUser > => {
    const userExists = await User.findOne({ email: reqUser.email })
    if (userExists) {
        throw ApiError.duplicate('user email already taken')
    }

    const hash = await bcrypt.hash(reqUser.password, 3)
    const user: IUser = await User.create({ email: reqUser.email, password: hash, firstName: reqUser.firstName, lastName: reqUser.lastName })

    return user
}

export const login = async ({ email, password }) => {
    const __dirname = path.resolve()
    const user: IUser = await findByEmail(email)
    if (!user) return Promise.reject('incorrect email or password')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return Promise.reject('incorrect email or password')
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, fs.readFileSync(__dirname + '/privateKey'), { algorithm: 'RS256' });
    return token
}

export const findByEmail = async (email): Promise < IUser | undefined > => {
    return await User.findOne({ email })
}

export const findById = async (id: string): Promise < IUser > => {
    const user: IUser = await User.findById(id)
    if (!user) throw ApiError.notFound('no user found')
    return user
}
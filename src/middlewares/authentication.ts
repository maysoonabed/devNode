import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { IReq } from '../interfaces/IRequest'

const validateToken = token => {
    const __dirname = path.resolve()
    const secret = fs.readFileSync(__dirname + '/privateKey')
    return jwt.verify(token, secret, { algorithms: ['RS256'] })
}

export default async (req: IReq, res, next) => {
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(" ")[1]
    if (!token) return res.status(401).json({
        message: 'missing token'
    })
    try {
        const payload = validateToken(token)
        if (payload) {
            req.userId = payload._id
            req.userEmail = payload.email
            return next()
        }
    } catch (e) {
        console.log(e)
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
    next()
}
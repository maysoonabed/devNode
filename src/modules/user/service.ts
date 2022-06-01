import User from '../../models/User'
import Reminder from '../../models/Reminder'
import Interview from '../../models/Interview'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { IUser, RUser } from '../../interfaces/IUser'
import { IRem, RRem } from '../../interfaces/IRem'
import Opts from '../../interfaces/opts'

import { ApiError } from '../../errors/ApiError'
import reminder from '../../queues/reminder'
import milliseconds from "milliseconds"


export const create = async (reqUser: RUser): Promise < IUser > => {
    const userExists = await User.findOne({ email: reqUser.email })
    if (userExists) {
        throw ApiError.duplicate('user email already taken')
    }

    const hash = await bcrypt.hash(reqUser.password, 3)
    const user: IUser = await User.create({ email: reqUser.email, password: hash, firstName: reqUser.firstName, lastName: reqUser.lastName })

    if (user) {
        const subject = 'Registration Process'
        const text = 'Please Complete the Registration Process'
        const jobId = 'activate' + user.email
        const rem: IRem = await createReminder({ user: user, dunno: 'After', subject, text, jobId, repeated: 3, interval: 1 })

    }
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

export const createReminder = async ({ user, subject, text, jobId, repeated, interval, dunno, endDate = null }): Promise < IRem > => {
    let opts: Opts = {
        jobId,
        repeat: {
            every: milliseconds.minutes(interval),
            limit: repeated
        }
    }

    if (dunno == 'Before')
        opts.repeat.endDate = endDate
    const rem: IRem = await Reminder.create({ name: subject, to: user._id, dunno, repeated, interval })
    reminder.add({ email: user.email, subject, text }, opts)
    return reminder
}

export const activate = async (id) => {
    const updated = await User.findOneAndUpdate({ _id: id }, { activated: true })
    if (updated) {
        const repeatableJobs = await reminder.getRepeatableJobs();
        const jobWithId = repeatableJobs.filter(job => job.id == 'activate' + updated.email)[0]
        if (jobWithId) reminder.removeRepeatableByKey(jobWithId.key);
    }
    return updated
}

export const addInterview = async ({ name, dateTime, userId }) => {
    const interview = await Interview.create({ name, to: userId, dateTime })
    const user = await User.findById(userId)
    if (interview && user) {
        const subject = 'Interview Reminder'
        const text = `You Are Having An Interview ${name} at ${dateTime}`
        const jobId = name + user.email
        const rem: IRem = await createReminder({ user: user, dunno: 'Before', subject, text, jobId, repeated: 3, interval: 1, endDate: dateTime })
    }
    return interview
}
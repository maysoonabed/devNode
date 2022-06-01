import Reminder from '../models/Reminder'
import Opts from '../interfaces/opts'
import reminder from '../queues/reminder'
import milliseconds from "milliseconds"
import { IRem } from '../interfaces/IRem'


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

export const removeRepaetedReminder = async (id) => {
    const repeatableJobs = await reminder.getRepeatableJobs();
    const jobWithId = repeatableJobs.filter(job => job.id == id)[0]
    if (jobWithId) reminder.removeRepeatableByKey(jobWithId.key);
}
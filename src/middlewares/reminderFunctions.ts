import Reminder from '../models/Reminder'
import Opts from '../interfaces/opts'
import reminder from '../queues/reminder'
import milliseconds from "milliseconds"


export const createReminder = async ({ user, subject, text, jobId, repeated, interval, dunno, endDate = null, obj = null }) => {
    let nextRun
    endDate = new Date(endDate)
    if (dunno == 'After') {
        nextRun = new Date(new Date().getTime() + interval * 60000)
    } else {
        nextRun = new Date(endDate.getTime() - (interval * repeated * 60000))

        console.log(nextRun)
    }
    const rem = await Reminder.create({ name: subject, user: user, limit: repeated, interval, nextRun, text, obj })

}

export const removeRepaetedReminder = async (id) => {
    const repeatableJobs = await reminder.getRepeatableJobs();
    const jobWithId = repeatableJobs.filter(job => job.id == id)[0]
    if (jobWithId) reminder.removeRepeatableByKey(jobWithId.key);
}
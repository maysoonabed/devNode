import Queue from 'bull'
import { connection } from '../core/redis'
import Reminder from '../models/Reminder'
import nodemailer from "nodemailer"
const reminders = new Queue('update user status', connection)

reminders.process(async (job, done) => {
    let now = new Date()
    for await (const rem of Reminder.find({ nextRun: { $lt: now.getTime() + 60000 } }).batchSize(100)) {
        let nextRun = new Date(now.getTime() + (rem.interval * 60000))
        rem.count++
        sendMail({ email: rem.user.email, subject: rem.name, text: rem.text })

        if (rem.count === rem.limit) rem.remove()
        else {
            rem.nextRun = nextRun
            await rem.save()
        }
    }
    done()
})

const sendMail = async ({ email, subject, text }) => {
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'task.npm@gmail.com',
            pass: 'reminder'
        }
    });
    let info = await transporter.sendMail({
        from: 'task.npm @gmail.com',
        to: email,
        subject,
        text,
    });

}



reminders.add({}, { repeat: { cron: ' * * * * *' } })

export default reminders
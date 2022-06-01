import Queue from 'bull'
import { connection } from '../core/redis'
import nodemailer from "nodemailer"
import Reminder from '../models/Reminder'


const reminder = new Queue('reminders queue', connection)

reminder.process(async (job, done) => {
    //console.log(job)
    const { email, subject, text } = job.data
    let count = job.opts.repeat.count
    sendMail(email, subject, text)

    done()
})

const sendMail = async (email, subject, text) => {
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


export default reminder
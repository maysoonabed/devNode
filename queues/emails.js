import Queue from 'bull'
import { connection } from '../core/redis.js'
import cluster from 'cluster'

const emailQueue = new Queue('emails queue', connection)

if (cluster.isPrimary) {
    for (let index = 0; index < 8; index++) {
        cluster.fork()
    }
} else {
    emailQueue.process((job, done) => {
        const { user, emailTemplate } = job.data
        // send email via node mailer
        done()
    })
}

export default emailQueue
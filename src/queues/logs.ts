import Queue from 'bull'
import { connection } from '../core/redis'

const logQueue = new Queue('logs queue', connection)

logQueue.process((job, done) => {
    const log = job.data
    console.log(log)
    done()
})

export default logQueue
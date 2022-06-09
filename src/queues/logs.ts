import Queue from 'bull'
import { connection } from '../core/redis'

const logQueue = new Queue('logs queue', connection)

logQueue.process(async (job, done) => {

    done()
})


export default logQueue
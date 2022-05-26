import Queue from 'bull'
import { connection } from '../core/redis'
import { ILog, RLog } from '../interfaces/ILog'
import AuditLog from '../models/AuditLog'


const logQueue = new Queue('logs queue', connection)

logQueue.process(async (job, done) => {
    const log = job.data
    let createdLog = await createLog(log)
    done()
})

const createLog = async (reqLog: RLog): Promise < ILog > => {
    const log: ILog = await AuditLog.create({
        method: reqLog.method,
        who: reqLog.who,
        how: reqLog.how,
        responseTime: reqLog.responseTime,
        what: reqLog.what
    })
    return log
}
export default logQueue
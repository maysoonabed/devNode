import { ILog, RLog } from '../interfaces/ILog'
import AuditLog from '../models/AuditLog'
import logQueue from '../queues/logs'

export const createLog = async (reqLog: RLog): Promise < ILog > => {

    const log: ILog = await AuditLog.create({
        method: reqLog.method,
        who: reqLog.who,
        how: reqLog.how,
        responseTime: reqLog.responseTime,
        what: reqLog.what
    })
    logQueue.add(log)

    return log
}
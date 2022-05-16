import Queue from 'bull'
import { connection } from '../core/redis.js'
import UserModel from '../models/User.js'

const updateUserStatus = new Queue('update user status', connection)

updateUserStatus.process(async (job, done) => {
    for await (const user of UserModel.find({}).batchSize(100)) {
        user.status = 'inactive'
        // bulkWrite
        await user.save()
    }
    done()
})

updateUserStatus.add({}, { repeat: { cron: '* * 1 * *' } })

export default updateUserStatus
import express from 'express'
import connect from './core/db'
import { ApiError } from './errors/ApiError'
import userRouter from './modules/user/routes'
import responseTime from 'response-time'
import { IReq } from './interfaces/IRequest'
import { Methods, RLog } from './interfaces/ILog'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter.js'
import { ExpressAdapter } from '@bull-board/express'
import reminder from './queues/reminder'


connect().then(async () => {
    const app = express();
    const port: number = 3000;
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/users', userRouter)

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
        queues: [new BullAdapter(reminder)],
        serverAdapter: serverAdapter,
    })

    app.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            return res.status(err.code).json(err)
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        })
    })

    serverAdapter.setBasePath('/admin/queue')
    app.use('/admin/queue', serverAdapter.getRouter())

    app.listen(port, () => {
        console.log(`app is listening at port ${port}`)
    })
}).catch(err => {
    console.log('could not connect to the database', err)

})
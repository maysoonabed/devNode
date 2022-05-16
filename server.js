import express from "express";
import userRouter from "./modules/user/routes.js"
import postRouter from "./modules/post/routes.js"
import adminRouter from "./modules/admin/routes.js"
import { ApiError } from "./errors/ApiError.js"
import connect from './core/db.js'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter.js'
import { ExpressAdapter } from '@bull-board/express'

import emailsQueue from './queues/emails.js'
import cpuIntensive from './queues/cpu-intensive-task.js'
import updateStatus from './jobs/updateStatus.js'

connect().then(() => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/users', userRouter)
    app.use('/posts', postRouter)
    app.use('/admins', adminRouter)

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
        queues: [new BullAdapter(emailsQueue), new BullAdapter(cpuIntensive), new BullAdapter(updateStatus)],
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

    serverAdapter.setBasePath('/admin/queues')
    app.use('/admin/queues', serverAdapter.getRouter())

    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
}).catch(err => console.log(err))

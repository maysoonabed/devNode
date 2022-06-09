import express from 'express'
import connect from './core/db'
import { ApiError } from './errors/ApiError'
import userRouter from './modules/user/routes'
import responseTime from 'response-time'

//import reminder from './queues/reminder'


connect().then(async () => {
    const app = express();
    const port: number = 3000;
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/users', userRouter)


    app.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            return res.status(err.code).json(err)
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        })
    })

    app.listen(port, () => {
        console.log(`app is listening at port ${port}`)
    })
}).catch(err => {
    console.log('could not connect to the database', err)

})
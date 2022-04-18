import express from "express";
import userRouter from "./modules/user/routes.js"
import postRouter from "./modules/post/routes.js"
import adminRouter from "./modules/admin/routes.js"
import mongoose from "mongoose"

async function connect() {
    await mongoose.connect('mongodb://localhost:27018/base')
    // await mongoose.connect('mongodb+srv://nodejs:rHamqoLqxqxeZ7r2@cluster0.l4sky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}

connect().then(() => {
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/users', userRouter)
    app.use('/posts', postRouter)
    app.use('/admins', adminRouter)

    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
}).catch(err => console.log(err))

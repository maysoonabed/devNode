import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    email: String,
    password: String
})

export default mongoose.model('User', schemaUser)
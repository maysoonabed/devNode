import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String
})

schemaUser.pre('save', function (next) {
    let fullName = [this.firstName, this.middleName, this.lastName]
        .filter(Boolean)
        .join(' ')
    this.fullName = fullName
    next()
})

schemaUser.post('save', function (doc, next) {
    // send doc to elasticsearch
    next()
})

export default mongoose.model('User', schemaUser)
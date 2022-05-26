import mongoose from 'mongoose'
import { IUser } from '../interfaces/IUser'

const options = {
    discriminatorKey: 'type',
    collection: 'User',
    timestamps: true
}

const schemaUser = new mongoose.Schema < IUser > ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String
}, options)
/*
schemaUser.post('init', doc => {
    // console.log(doc)
    console.log('init has been called');
})

schemaUser.pre('validate', function() {
    // if (this._doc.type === 'Admin' && !this._doc.middleName) {
    //     throw new Error('middle name is required for admin users')
    // }
    console.log('pre validate has been called')
})


schemaUser.post('find', function(doc, next) {
    // send doc to elasticsearch
    console.log("pre find has been called")
    next()
})


schemaUser.post('save', function(doc, next) {
    // send doc to elasticsearch
    console.log("post save has been called")
    if (this.$locals.isNew) {
        //
    }
    next()
})

schemaUser.post('validate', function() {
    // validated and ready to be saved
    console.log('post validate has been called')
})
*/
schemaUser.pre('save', function(next) {
    let fullName = [this.firstName, this.middleName, this.lastName]
        .filter(Boolean)
        .join(' ')
    this.fullName = fullName
    //console.log("pre save has been called")

    if (this.isNew) {
        this.set({ createdAt: Date.now() })
        this.$locals.isNew = this.isNew
    } else {
        this.set({ updatedAt: Date.now() })
    }

    if (this.isModified('email')) {
        //
    }

    next()
})



// schemaUser.pre('remove', function (doc, next) {
//     // send doc to elasticsearch
//     console.log("pre remove has been called")
//     next()
// })

schemaUser.pre('find', function() {
    // send doc to elasticsearch
    this.setQuery({ deleted: false })
    console.log(this.getQuery())
    // this.delete = false
    // next()
})

schemaUser.pre('updateOne', function() {
    // send doc to elasticsearch
    this.set({ updatedAt: Date.now() })
    console.log("pre updateOne has been called")
    // next()
})

export default mongoose.model < IUser > ('User', schemaUser)
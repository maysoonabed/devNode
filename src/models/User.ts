import mongoose from 'mongoose'
import { IUser } from '../interfaces/IUser'

const schemaUser = new mongoose.Schema < IUser > ({
    email: { type: String, required: true, unique: true }, //
    password: { type: String, required: true },
    activated: { type: Boolean, default: false },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String
}, { timestamps: true })

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

export default mongoose.model < IUser > ('ser', schemaUser)
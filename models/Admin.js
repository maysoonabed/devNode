import mongoose from 'mongoose'
import User from './User.js'

const adminSchema = User.discriminator('Admin', new mongoose.Schema({
    roles: [{ type: String }] // audit, grant-permissions, ... 
    // ...
    // ...
}, { timestamps: true }))

export default adminSchema
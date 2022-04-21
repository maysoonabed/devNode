import mongoose from 'mongoose'

const seedsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    flag: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Seeds', seedsSchema)
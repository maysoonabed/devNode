import mongoose from 'mongoose'

const schemaInterview = new mongoose.Schema({
    name: { type: String, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateTime: Date
}, { timestamps: true })
//ttl?
export default mongoose.model('Interview', schemaInterview)
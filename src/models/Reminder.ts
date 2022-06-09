import mongoose from 'mongoose'
import { schemaUser } from './User'
import { schemaInterview } from './Interview'

const schemaReminder = new mongoose.Schema({
    name: { type: String, required: true },
    text: String,
    dunno: {
        type: String,
        enum: ["Before",
            "After"
        ]
    },
    interval: Number,
    user: schemaUser,
    limit: Number,
    count: {
        type: Number,
        default: 0,
    },
    nextRun: Date,
    obj: schemaInterview
}, { timestamps: true })

export default mongoose.model('Reminder', schemaReminder)
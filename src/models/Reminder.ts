import mongoose from 'mongoose'
import { IRem } from '../interfaces/IRem'

const schemaReminder = new mongoose.Schema < IRem > ({
    name: { type: String, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dunno: {
        type: String,
        enum: ["Before",
            "After"
        ]
    },
    interval: Number,
    repeated: Number

}, { timestamps: true })

export default mongoose.model < IRem > ('Reminder', schemaReminder)
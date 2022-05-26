import mongoose from 'mongoose'
import { ILog } from '../interfaces/ILog'



const schemaLog = new mongoose.Schema < ILog > ({
    what: String,
    method: {
        type: String,
        enum: ["GET",
            "POST",
            "PUT",
            "DELETE"
        ]
    },
    who: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    how: Number,
    responseTime: Number
}, { timestamps: { createdAt: true, updatedAt: false } })



export default mongoose.model < ILog > ('AuditLog', schemaLog)
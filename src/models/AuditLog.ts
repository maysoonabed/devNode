import mongoose from 'mongoose'
import { ILog } from '../interfaces/ILog'

const options = {
    discriminatorKey: 'type',
    collection: 'AuditLog',
    timestamps: { createdAt: true, updatedAt: false }
}

const schemaUser = new mongoose.Schema < ILog > ({
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
}, options)



export default mongoose.model < ILog > ('AuditLog', schemaUser)
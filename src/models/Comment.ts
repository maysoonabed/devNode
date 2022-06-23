import mongoose from 'mongoose'
import { IComment } from '../interfaces/IComment'
import MongooseDelete from 'mongoose-delete'

export const schemaComment = new mongoose.Schema < IComment > ({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }

}, { timestamps: true })


schemaComment.plugin(MongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });

export default mongoose.model < IComment, MongooseDelete.SoftDeleteModel < IComment > > ('Comment', schemaComment)
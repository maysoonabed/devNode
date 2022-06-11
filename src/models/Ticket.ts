import mongoose from 'mongoose'
import { ITicket } from '../interfaces/ITicket'
import MongooseDelete from 'mongoose-delete'
import { logger } from '../middlewares/logger'
import util from 'util'

export const schemaTicket = new mongoose.Schema < ITicket > ({
    name: { type: String, required: true }, //,unique:true

    workflow: [{
        type: String
    }],
    description: String,
    stage: String,
    type: {
        type: String,
        enum: ["story",
            "bug"
        ]
    },
    severity: {
        type: String,
        enum: ["Blocker",
            "Critical",
            "Major",
            "Minor",
            "Trivial"
        ]
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    parentTicket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }

}, { timestamps: true })

schemaTicket.index({ name: 'text', description: 'text' })

schemaTicket.plugin(MongooseDelete, { deletedAt: true, deletedBy: true });

schemaTicket.post('save', function(doc) {
    logger.info(`A new ticket was created by ${doc.userId}`, { timestamp: doc.updatedAt })
})

schemaTicket.post('findOneAndUpdate', function(doc) {
    const modifiedFields = this.getUpdate();
    delete modifiedFields['$set']['updatedAt'];
    delete modifiedFields['$set']['updatedBy'];
    delete modifiedFields['$setOnInsert'];
    logger.info(`Following fields ${util.inspect(modifiedFields['$set'] )} of ticket ${doc._id} were updated by ${doc.updatedBy}`, { timestamp: doc.updatedAt })
})

schemaTicket.post('delete', function(doc) {
    logger.info(`Ticket ${doc._id}  was deleted by ${doc.deletedBy}`, { timestamp: doc.deletedAt })
})
export default mongoose.model < ITicket, MongooseDelete.SoftDeleteModel < ITicket > > ('Ticket', schemaTicket)
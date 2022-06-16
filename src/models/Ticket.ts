import mongoose from 'mongoose'
import { ITicket } from '../interfaces/ITicket'
import MongooseDelete from 'mongoose-delete'
import { logger } from '../middlewares/logger'
import util from 'util'
import { index, updateDocument } from '../utils/elastic'
import { aggregateById } from '../modules/ticket/service'
import { schemaComment } from './Comment'

const options = {
    discriminatorKey: 'type',
    timestamps: true
}

export const schemaTicket = new mongoose.Schema < ITicket > ({
    name: { type: String, required: true }, //,unique:true
    workflow: [{
        type: String
    }],
    comments: [{
        type: schemaComment
    }],
    description: String,
    stage: String,
    assignee: String,
    createdBy: String,
    updatedBy: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    parentTicket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
}, options)

schemaTicket.index({ name: 'text', description: 'text' })

schemaTicket.plugin(MongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });

schemaTicket.post('save', async function(doc) {
    logger.info(`A new ${doc.type} was created by ${doc.createdBy}`, { timestamp: doc.updatedAt });
    const clone = await aggregateById(doc._id)
    await index(doc._id, 'tickets', clone);
})

schemaTicket.post('findOneAndUpdate', async function(doc) {
    const clone = await aggregateById(doc._id)
    await updateDocument(doc._id, 'tickets', clone);

    const modifiedFields = this.getUpdate();
    delete modifiedFields['$set']['updatedAt'];
    delete modifiedFields['$set']['updatedBy'];
    delete modifiedFields['$setOnInsert'];
    logger.info(`Following fields ${util.inspect(modifiedFields['$set'] )} of ticket ${doc._id} were updated by ${doc.updatedBy}`, { timestamp: doc.updatedAt })
})

schemaTicket.pre('find', function() {
    this.where({ deleted: false });
});
const Ticket = mongoose.model < ITicket,
    MongooseDelete.SoftDeleteModel < ITicket > > ('Ticket', schemaTicket)
export default Ticket
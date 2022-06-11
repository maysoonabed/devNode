import mongoose from 'mongoose'
import { IProject } from '../interfaces/IProject'
import MongooseDelete from 'mongoose-delete'

export const schemaProject = new mongoose.Schema < IProject > ({
    name: { type: String, required: true }, //,unique:true
    workflow: [{
        type: String
    }]

}, { timestamps: true })

schemaProject.index({ name: 'text' })

schemaProject.plugin(MongooseDelete, { deletedAt: true, deletedBy: true });


export default mongoose.model < IProject, MongooseDelete.SoftDeleteModel < IProject > > ('Project', schemaProject)
import mongoose from 'mongoose'

const options = {
    discriminatorKey: 'type',
    collection: 'InterAct',
    timestamps: true
}

const schemaInterAct = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, options)

export default mongoose.model('InterAct', schemaInterAct)
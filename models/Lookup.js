import mongoose from 'mongoose'

const options = {
    discriminatorKey: 'type',
    collection: 'Lookup',
    timestamps: true
}

const schemaLookup = new mongoose.Schema({
    name: { type: String, required: true }
}, options)

export default mongoose.model('Lookup', schemaLookup)
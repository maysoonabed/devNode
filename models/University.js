import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const universitiesSchema = Lookup.discriminator('University', new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Country' },
}))

export default universitiesSchema
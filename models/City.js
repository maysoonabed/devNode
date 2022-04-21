import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const citiesSchema = Lookup.discriminator('City', new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Country' },


}))
export default citiesSchema
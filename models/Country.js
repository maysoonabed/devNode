import mongoose from 'mongoose'
import Lookup from './Lookup.js'

const countrySchema = Lookup.discriminator('Country', new mongoose.Schema({

}))

export default countrySchema
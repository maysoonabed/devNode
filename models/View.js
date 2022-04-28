import mongoose from 'mongoose'
import InterAct from './InterAct.js'

const viewSchema = InterAct.discriminator('View', new mongoose.Schema({
    story_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }
}))

export default viewSchema
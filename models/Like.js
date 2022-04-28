import mongoose from 'mongoose'
import InterAct from './InterAct.js'

const likeSchema = InterAct.discriminator('Like', new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }
}))

export default likeSchema
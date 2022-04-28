import mongoose from 'mongoose'
import mongoose_delete from 'mongoose-delete'

const storySchema = new mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String, required: true },
    user: {
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        fullName: String
    },

    views: { type: Number, default: 0 }
}, {
    timestamps: true
})

storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })
storySchema.index({ 'user.fullname': 'text', content: 'text' }, {
    weights: {
        'user.fullname': 5,
        content: 2
    }
})

storySchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
storySchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })


storySchema.static.findByUser = async function(user_id) {
    return await this.find({ user_id })
}


export default mongoose.model('aStory', storySchema)
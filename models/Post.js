import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'

const contentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    likes: { type: Number, default: 0 }
}, {
    timestamps: true
})

contentSchema.plugin(paginate)
contentSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
contentSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })


contentSchema.static.findByUser = async function (user_id) {
    /**
     * this keyword here refers to model name => Content.
     * it's equivalent to:
     * return await Content.find({ user_id })
     */
    return await this.find({ user_id })
}

contentSchema.methods.findContentsByTheSameUser = async function () {
    /**
     * this keyword here refers to document leaded in memory.
     */
    return await mongoose.model('Content').find({ user_id: this.user_id })
}

export default mongoose.model('Content', contentSchema)
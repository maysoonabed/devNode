import mongoose from 'mongoose'
import mongoose_delete from 'mongoose-delete'

const authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    fullName: String,
    author_image: { type: String }

}, {
    timestamps: true
})


authorSchema.index({ fullName: 'text' })


authorSchema.pre('save', function(next) {
    let fullName = [this.first_name, this.last_name]
        .filter(Boolean)
        .join(' ')
    this.fullName = fullName
    next()
})


export default mongoose.model('Auth', authorSchema)
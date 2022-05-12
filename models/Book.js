import mongoose from 'mongoose'
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    book_cover_image: { type: String, required: true },
    author: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
        fullName: String
    }
}, {
    timestamps: true
})

bookSchema.index({ 'author.fullName': 'text', name: 'text' })


bookSchema.plugin(aggregatePaginate)
export default mongoose.model('Book', bookSchema)
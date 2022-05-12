import Author from '../../models/Author.js'
import mongoose from 'mongoose'
import { ApiError } from '../../errors/ApiError.js'

export const create = async ({ first_name, last_name, author_image }) => {
    return await Author.create({ first_name, last_name, author_image })

}
export const viewAuth = async (author_id) => {
    let author = await availableAuthor(author_id)
    if (!author) {
        throw ApiError.notFound('Author not Found')
    }
    return author
}

export const availableAuthor = async (author_id) => {
    return await Author.findOne({ _id: author_id })
}


export const searchAuthor = async ({ name, skip }) => {
    const authors = await Author.find({ $text: { $search: name } })
        .skip(skip)
        .limit(10)
    return authors
}
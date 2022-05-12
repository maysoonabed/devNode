 import mongoose from 'mongoose'
 import { ApiError } from '../../errors/ApiError.js'
 import Author from '../../models/Author.js'
 import Book from '../../models/Book.js'

 export const create = async ({ name, ISBN, author_id, book_cover_image }) => {
     let author = await Author.findById(author_id).select('fullName')
     if (!author) {
         throw ApiError.notFound('Author not Found')
     }
     return await Book.create({ name, ISBN, author, book_cover_image })

 }

 export const searchBook = async ({ text, ISBN, skip }) => {
     let conds = []
     if (text) conds.push({
         $match: { $text: { $search: text } }
     })
     if (ISBN) conds.push({
         $match: { 'ISBN': ISBN }
     })
     var myAggregate = Book.aggregate(conds)
     const options = {
         page: 1,
         limit: skip,
     };
     return await Book.aggregatePaginate(myAggregate, options)
 }

 export const viewBook = async (book_id) => {
     let book = await availableBook(book_id)
     if (!book) {
         throw ApiError.notFound('Book not Found')
     }
     return book
 }
 export const availableAuthor = async (author_id) => {
     return await Author.findOne({ _id: author_id })
 }

 export const findByISBN = async (ISBN) => {
     return await Book.findOne({ ISBN })
 }

 export const availableBook = async (book_id) => {
     return await Book.findOne({ _id: book_id })
 }
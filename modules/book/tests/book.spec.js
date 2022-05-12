import { create, searchBook, viewBook, findByISBN, availableAuthor } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'
import { author } from "../../author/tests/author.spec.js"
import mongoose from 'mongoose'

const createError = async ({ name, ISBN, author_id, book_cover_image }) => {
    let errorMessage
    try {
        await create({
            name,
            ISBN,
            author_id,
            book_cover_image
        })
    } catch (error) {
        errorMessage = error.message;
    }
    return errorMessage
}

describe('book tests', () => {
    let book = null
    beforeAll(async () => {
        await connect()
    })

    it('check author', async () => {
        let auth2 = await availableAuthor(author._id)
        expect(auth2.last_name).toBe('elefante')
    })

    it('create book', async () => {
        book = await create({
            name: "book",
            ISBN: "978-1-4028-9462-6",
            author_id: author._id,
            book_cover_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(book.name).toBe('book')
    })

    it('view book', async () => {
        let book2 = await viewBook(book._id)
        expect(book2.author._id).toEqual(author._id)
    })
    it('search ISBN', async () => {
        let book2 = await findByISBN(book.ISBN)
        expect(book2.author._id).toEqual(author._id)
    })
    it('search book', async () => {
        let book = await searchBook({ text: "book", ISBN: "978-1-4028-9462-6", skip: 0 })
        expect(book.docs[0].name).toBe('book')
    })
    it('search book', async () => {
        let book = await searchBook({ text: "book", skip: 0 })
        expect(book.docs[0].name).toBe('book')
    })
    it('search book', async () => {
        let book = await searchBook({ ISBN: "978-1-4028-9462-6" })
        expect(book.docs[0].name).toBe('book')
    })

    it('search book', async () => {
        let book = await searchBook({ text: "elefante" })
        expect(book.docs[0].name).toBe('book')
    })

    it('create book no name', async () => {
        let errorMessage = await createError({
            ISBN: "978-1-4028-9462-6",
            author_id: author._id,
            book_cover_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(errorMessage).toBe('Book validation failed: name: Path `name` is required.');
    })

    it('create book duplicated ISBN', async () => {
        let errorMessage = await createError({
            name: "book",
            ISBN: book.ISBN,
            author_id: author._id,
            book_cover_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(errorMessage).toBe(`E11000 duplicate key error dup key: { : "${book.ISBN}" }`);

    })

    it('create book invalid mongo Id', async () => {
        let AuthId = "123"
        let errorMessage = await createError({
            name: "book",
            ISBN: "978-1-4028-9462-6",
            author_id: AuthId,
            book_cover_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(errorMessage).toBe(`Cast to ObjectId failed for value "${AuthId}" (type string) at path "_id" for model "Auth"`);
    })

    it('create book invalid author', async () => {
        let AuthId = "627cc9be6b2345582061294d"
        let errorMessage = await createError({
            name: "book",
            ISBN: "978-1-4028-9462-6",
            author_id: AuthId,
            book_cover_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(errorMessage).toBe('Author not Found');
    })

})
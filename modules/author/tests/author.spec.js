import { create, viewAuth, searchAuthor } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'
import mongoose from 'mongoose'

export let author = null
describe('author tests', () => {
    beforeAll(async () => {
        await connect()
    })

    it('create author', async () => {
        author = await create({
            first_name: "Hermosa",
            last_name: "elefante",
            author_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(author.fullName).toBe('Hermosa elefante')
    })

    it('view author', async () => {
        let auth2 = await viewAuth(author._id)
        expect(auth2.last_name).toBe('elefante')
    })

    it('search author', async () => {
        let auth2 = await searchAuthor({ name: "Hermosa", skip: 0 })
        expect(auth2[0].last_name).toBe('elefante')
    })

})
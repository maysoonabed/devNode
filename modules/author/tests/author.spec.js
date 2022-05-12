import { create, viewAuth, searchAuthor, availableAuthor } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'
import mongoose from 'mongoose'

describe('admin tests', () => {
    let number
    let author = null
    beforeAll(async () => {
        await connect()
    })


    it('create author', async () => {
        author = await create({
            first_name: "Hermosa",
            last_name: "elefante",
            author_image: "https://images.app.goo.gl/ePLX5h6wr4m1Lq8m9"
        })
        expect(author.fullname).toBe('Hermosa elefante')
    })


})
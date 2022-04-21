import { countries } from './data/countries.js';
import Country from '../models/Country.js'
import City from '../models/City.js'
import University from '../models/University.js'
import Lookup from '../models/Lookup.js'
import mongoose from 'mongoose'
import { ApiError } from '../errors/ApiError.js'

export default async () => {
    //Sorry the data are way too large for me to keep track of different cases
    //how to extend the transaction time limit?
    for (let con of countries) {
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            let country = await Country.create([{ name: con["name"] }], { session })
            if (!country) {
                throw ApiError.badRequest('error adding Country')
            }
            const universities = con["universities"].map(obj => ({ ...obj, country_id: country[0]._id }))
            const cities = con["cities"].map(obj => ({ ...obj, country_id: country[0]._id }))
            await University.insertMany(universities, { session })
            await City.insertMany(cities, { session })
        })
        session.endSession()
    }
}
import { countries } from './data/countries.js';
import Country from '../models/Country.js'

export default async cb => {
    await Country.insertMany(countries)
    cb()
}
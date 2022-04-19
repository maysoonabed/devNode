import { countries } from './data/countries.js';
import Country from '../models/Country.js'

export default async () => {
    await Country.insertMany(countries)
}
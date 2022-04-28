import { countries } from './data/countries.js';
import Country from '../models/Country.js'

export default async () => {
    // transaction
      await Country.insertMany(countries)
}
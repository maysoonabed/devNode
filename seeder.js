import fs from 'fs/promises' // use promises version not callbacks version
import path from 'path'
import connect from './core/db.js'
import { exit } from 'process'
import { pathToFileURL } from 'url'
import Seeded from './models/Seeded.js'
import { ApiError } from './errors/ApiError.js'

const __dirname = path.resolve()

connect().then(async () => {
    const files = await fs.readdir(path.join(__dirname, '/seed/'))
    for await (const file of files) {
        if (file.endsWith('.js')) {
            const exists = await Seeded.exists({ name: file });
            if (!exists) {

                const seeding = await Seeded.create({ name: file })
                if (!seeding) {
                    throw ApiError.badRequest('error adding file')
                }
                const seed = await import(pathToFileURL(path.join(__dirname, `/seed/${file}`)).toString())
                if (await Seeded.findOne({ name: file }).select('flag')) {
                    await Seeded.updateOne({ name: file }, { flag: "false" })
                    await seed.default()
                }
            }
        }
    }
    console.log('Done!')
    exit(0)
}).catch(err => {
    console.log(err)
})
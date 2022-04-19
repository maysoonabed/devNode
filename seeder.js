import fs from 'fs';
import path from 'path'
const __dirname = path.resolve()

fs.readdir(path.join(__dirname, '/seed/'), (err, files) => {
    files.forEach(file => {
        if (file.endsWith('.js')) {
            import(path.join(__dirname, `/seed/${file}`))
                .then(async seed => {
                    console.log(seed)
                    await seed.default(() => { })
                })
        }
    })
})
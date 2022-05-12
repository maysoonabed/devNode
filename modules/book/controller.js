import * as service from './service.js'

export const create = async (req, res, next) => {
    const { name, ISBN, author_id, book_cover_image } = req.body
    service.create({ name, ISBN, author_id, book_cover_image }).then((result => res.status(201).send(result)))
        .catch(next)
}


export const viewBook = async (req, res, next) => {
    const { id } = req.params
    service.viewBook(id).then((result => res.status(200).send(result)))
        .catch(next)

}
export const find = async (req, res) => {
    const { text, ISBN, skip } = req.query
    const books = await service.searchBook(text, ISBN, skip)
    return res.send(books)
}


export const viewStory = async (req, res, next) => {
    const { id } = req.params
    service.viewStory({ story_id: id, user_id: req.userId })
        .then((result => res.status(201).send(result)))
        .catch(next)
}
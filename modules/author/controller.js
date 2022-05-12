import * as service from './service.js'

export const create = async (req, res) => {
    const { first_name, last_name, author_image } = req.body
    const author = await service.create({ first_name, last_name, author_image })
    res.status(201).send(author)
}

export const find = async (req, res) => {
    const { name, skip } = req.query
    const author = await service.searchAuthor({ name, skip })
    return res.send(author)
}


export const viewStory = async (req, res, next) => {
    const { id } = req.params
    service.viewStory({ story_id: id, user_id: req.userId })
        .then((result => res.status(201).send(result)))
        .catch(next)
}

export const viewAuth = async (req, res, next) => {
    const { id } = req.params
    service.viewAuth(id).then((result => res.status(200).send(result)))
        .catch(next)

}
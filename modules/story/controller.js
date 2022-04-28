import * as service from './service.js'

export const create = async (req, res) => {
    const { content, image } = req.body
    const story = await service.create({ content, image, user_id: req.userId })
    res.status(201).send(story)
}

export const find = async (req, res) => {
    const { toSearch, skip } = req.body
    const story = await service.searChTextOrUser(toSearch, skip)
    return res.send(story)
}


export const remove = async (req, res) => {
    const result = await service.remove({ story_id: req.params.id, user_id: req.userId })
    return res.status(204).send(result)
}
export const viewStory = async (req, res, next) => {
    const { id } = req.params
    service.viewStory({ story_id: id, user_id: req.userId })
        .then((result => res.status(201).send(result)))
        .catch(next)
}
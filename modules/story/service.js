import Story from '../../models/Story.js'
import View from '../../models/View.js'
import User from '../../models/User.js'
import mongoose from 'mongoose'
import { ApiError } from '../../errors/ApiError.js'

export const create = async ({ content, image, user_id }) => {
    let story
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        let fullname = await User.findById([user_id], null, { session }).select('fullName')
        let user = { user_id, fullName: fullname.fullName }
        story = await Story.create([{ content, image, user }], { session })
    })
    session.endSession()
    return story
}

export const searChTextOrUser = async (toSearch, skip) => {
    const stories = await Story.find({ $text: { $search: toSearch } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(10)
    return stories
}


export const viewStory = async ({ story_id, user_id }) => {
    let view
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        view = await View.create([{ story_id, user_id }], { session })
        if (!view) {
            throw ApiError.badRequest('error adding view')
        }
        await Story.updateOne({ _id: story_id }, { $inc: { views: 1 } }, { session })
    })
    session.endSession()
    return view
}

export const remove = async ({ story_id, user_id }) => {

    const story = await Story.findOneWithDeleted({ _id: story_id })
    if (!story) {
        throw new Error('No story')
    }
    return await story.delete()
}

export const availableStory = async ({ story_id }) => {
    return await Story.findOne({ _id: story_id })
}

export const authorizedStory = async ({ story_id, user_id }) => {
    return await Story.findOne({ _id: story_id, 'user.user_id': user_id })
}
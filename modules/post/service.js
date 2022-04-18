import Post from '../../models/Post.js'
import Like from '../../models/Like.js'
import User from '../../models/User.js'

export const create = async ({ content, type, post_id, user_id }) => {
  return await Post.create({ content, type, post_id, user_id })
}

export const findById = async post_id => {
  // await Post.find({
  //   content: 'some content',
  //   createdAt: new Date(),
  //   tags: { $in: ['nodejs', 'mongodb']}
  // })
  // Post.find()
  //   .where('content').equals('some content')
  //   .where('createdAt').gte(new Date())
  //   .where('tags').in(['nodejs', 'mongodb'])
  //   .select('content')
  //   .sort({ _id: -1 })//.sort('-_id')
  //   .limit(10)

  // await Post.deleteMany({
  //   createdAt: new Date
  // }) // { deletedCount: 0 }
  // await Post.findOneAndDelete({  })
  // await Post.findOneAndReplace({}, {})
  await Post.findOneAndUpdate({}, { xyz: "updated" }, {
    strict: false
  })
  // await Post.deleteOne({}) // { deletedCount: 0 }

  // await Post.insertMany([
  //   {
  //     content: 'c1',
  //     user_id: "u1"
  //   },
  //   {
  //     content: 'c2',
  //     user_id: "u2"
  //   }
  // ])

  // const users = User.find().batchSize(100)
  // for await (const user of users) {
  //   // send email
  // }

  // const cursor = User.find().cursor().addCursorFlag('noCursorTimeout', true)
  // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

  // }

  // Post.findByIdAndDelete(post_id) //

  return await Post.findById(post_id)
}

export const remove = async ({ post_id, user_id }) => {
  /**
   * we pass user_id to make sure that every user can remove only the posts that belongs to him.
   */
  const post = await Post.findOneWithDeleted({ _id: post_id })
  if (!post) {
    throw new Error('No post')
  }
  return await post.delete()
  // return await Post.deleteOne({ post_id, user_id })
}

export const find = async (query) => {
  // const { offset = 0, limit = 10 } = query
  // const options = {
  //   offset,
  //   limit
  // }
  return await Post.aggregate([
    {
      $match: {
        deleted: false
      }
    },
    {
      $lookup: {
        from: "User",
        localField: 'user_id',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
  // return await Post.find({}).populate([
  //   {
  //     path: 'user_id', model: 'User'
  //   }
  // ])
}

export const findContentsByTheSameUser = async () => {
  const post = await Post.findOne({ user_id: { $exists: true } })
  if (!post) return Promise.reject('no posts found')

  /**
   * this inside findContentsByTheSameUser() refers to post document loaded from database
   */
  return await post.findContentsByTheSameUser()
}

export const like = async ({ post_id, user_id }) => {
  return await Like.create({ post_id, user_id })
}

export const isLikedBefore = async ({ post_id, user_id }) => {
  return await Like.findOne({ post_id, user_id })
}
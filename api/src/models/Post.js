const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  animal: String,
  postType: {
    type: String,
    enum: ['lost', 'found', 'adoption'],
    default: 'lost',
  },
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Post = new model('Post', postSchema)

module.exports = { Post }

const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  animal: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ['male', 'female'],
  },
  postType: {
    type: String,
    enum: ['lost', 'found', 'adoption'],
    default: 'lost',
  },
  description: {
    type: String,
    required: true,
  },
  date: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  petImage: {
    type: String,
  }
});

const Post = new model('Post', postSchema);

module.exports = { Post };

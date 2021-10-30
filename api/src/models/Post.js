const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ['macho', 'hembra'],
  },
  state: {
    type: String,
    enum: ['perdido', 'encontrado', 'adopción'],
    default: 'perdido',
  },
  description: {
    type: String,
    required: true,
  },
  date: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  petImage: {
    type: String,
  },
});

const Post = new model('Post', postSchema);

module.exports = { Post };

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
    enum: ['Macho', 'Hembra'],
  },
  state: {
    type: String,
    enum: ['Perdido', 'Encontrado', 'Adopción'],
    default: 'Perdido',
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
  latitude: Number,
  longitude: Number,
});

const Post = new model('Post', postSchema);

module.exports = { Post };

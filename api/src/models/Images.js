const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  Post: { type: Schema.Types.ObjectId, ref: 'Post' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = new model('Image', imageSchema)

const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  Post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = new model('Image', imageSchema);

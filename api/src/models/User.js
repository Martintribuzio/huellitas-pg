const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postalCode: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = new model('User', userSchema);

module.exports = { User };

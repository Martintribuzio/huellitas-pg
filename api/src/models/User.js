const { Schema, model } = require('mongoose');
// const bcrypt = require("bcrypt-nodejs");
const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const userSchema = new Schema({
  picture: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  postalCode: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  authStrategy: {
    type: String,
    default: 'local',
  },
  refreshToken: {
    type: [Session],
  },
  confirmation: {
    type: Boolean,
    default: false
  },
});

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose);

const User = new model('User', userSchema);

module.exports = User;

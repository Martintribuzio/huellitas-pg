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
  type: {
    type: String,
    enum: ['user', 'shelter'],
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  website: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  latitude: String,
  longitude: String,
  profileImage: { type: Schema.Types.ObjectId, ref: 'Image' },
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

const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const shelterSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
      required: true
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
    description: {
      type: String,
      required: true,
    },
    profileImage: { type: Schema.Types.ObjectId, ref: 'Image' },

    latitude: String,
    longitude: String,
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post',
    }],
    password: {
        type: String,
      },
    authStrategy: {
        type: String,
        default: 'local',
      },
    refreshToken: {
        type: [Session],
      },
  }
  );

  shelterSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      delete ret.password;
      return ret;
    },
  });
  
  shelterSchema.plugin(passportLocalMongoose);
  
  
  const Shelter = new model('Shelter', shelterSchema);
  
  module.exports =  Shelter;
  
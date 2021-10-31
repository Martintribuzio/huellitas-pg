const { Schema, model } = require('mongoose');
// const bcrypt = require("bcrypt-nodejs");
const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const userSchema = new Schema({
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
    // required: true, Verificar esto...
  },
  password: {
    type: String,
    // required: true, Verificar esto...
  },
  postalCode: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
});
//Encriptacion
// userSchema.methods.encryptPassword = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

// //Comparacion de la contraseña que puso el usuario con la de la DB encriptada
// userSchema.methods.comparePassword = function(password){
//   return bcrypt.compareSync(password, this.password)
// }

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

userSchema.plugin(passportLocalMongoose)

const User = new model('User', userSchema);

module.exports = User;

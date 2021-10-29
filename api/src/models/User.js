const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postalCode: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});
//Encriptacion
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//Comparacion de la contraseña que puso el usuario con la de la DB encriptada
userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

const User = new model('User', userSchema);

module.exports = User;

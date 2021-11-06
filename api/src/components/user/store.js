const User = require('../../models/User');

const createUserDB = async email => {
  try {
    const user = User.findOne({ email: email });
    return user; //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
  } catch (error) {
    throw new Error('Error al crear');
  }
}; //Sospecho que este createUser no debe ir ya que el passport se encarga de esto

const searchUserDB = async email => {
  try {
    const user = await User.findOne({ email: email }); //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
    return user;
  } catch (error) {
    throw new Error('Error al buscar');
  }
};

const searchUserByIdDB = async id => {
  try {
    const user = await User.findById(id);
    console.log(user)
    return user;
  } catch (error) {
    throw new Error('Error al buscar el usuario');
  }
}

const postsByUserDB = async userId => {
  try {
    const user = await User.findById(userId).populate('posts');
    return user.posts;
  } catch {
    throw new Error('Mensaje');
  }
};

module.exports = {
  createUserDB,
  searchUserDB,
  postsByUserDB,
  searchUserByIdDB
};

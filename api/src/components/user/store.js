const User = require('../../models/User')


const createUserDB = async (email) => {
  try {
    const user = User.findOne({email: email})
    return user; //Hacemos la comprobación para ver si ya existe un correo electrónico igual en la DB
  } catch (error){
    console.log(error);
    throw new Error('Error al crear');
  }
}; //Sospecho que este createUser no debe ir ya que el passport se encarga de esto



const postsByUserDB = async userId => {
  try {
    const user = await User.findById(userId).populate('posts');
    return user.posts;
  } catch {
    console.log('Error al buscar');
    throw new Error('Mensaje');
  }
};

module.exports = {
  createUserDB,
  postsByUserDB,
};

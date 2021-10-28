const { User } = require('../../models/User');

const createUserDB = async (name, email, password, postalCode) => {
  try {
    const user = new User({ name, email, password, postalCode });
    await user.save();
    return user;
  } catch {
    console.log('Error al crear');
    throw new Error('Mensaje');
  }
};

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

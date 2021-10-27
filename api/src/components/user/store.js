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
  const user = await User.findById(userId).populate('posts');
  return user.posts;
};

module.exports = {
  createUserDB,
  postsByUserDB,
};

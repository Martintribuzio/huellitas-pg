const { Post } = require('../../models/Post');
const { User } = require('../../models/User');

const createPostDB = async (animal, postType, description, userId, genre) => {
  try {
    const post = new Post({
      animal,
      postType,
      description,
      user: userId,
      genre,
    });
    await post.save();

    const userById = await User.findById(userId);
    userById.posts.push(post);
    await userById.save();

    return post;
  } catch {
    console.log('Error al crear post');
    throw new Error('Mensaje');
  }
};

module.exports = {
  createPostDB,
};

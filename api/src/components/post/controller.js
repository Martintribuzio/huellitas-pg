const { createPostDB } = require('./store');

const createPost = async ({ animal, postType, genre, description, userId }) => {
  try {
    const post = await createPostDB(
      animal,
      postType,
      description,
      userId,
      genre
    );
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { createPost };

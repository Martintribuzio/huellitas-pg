const { createPostDB, findPostDB } = require('./store');
const moment = require('moment-timezone');

const createPost = async (
  { name, type, state, genre, description, userId },
  petImage
) => {
  const dateARG = moment
    .tz('America/Argentina/Buenos_Aires')
    .format('YYYY-MM-DD HH:mm:ss');
  try {
    const post = await createPostDB(
      name,
      type,
      state,
      description,
      userId,
      genre,
      dateARG,
      petImage
    );
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

const findPost = async id => {
  try {
    const post = await findPostDB(id);
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { createPost, findPost };

const { createPostDB, findPostDB, editPostDB, deletePostDB } = require('./store');
const moment = require('moment-timezone');

const createPost = async (
  { name, type, state, genre, description, id },
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
      id,
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

const editPost = async (_id, name, type, state, genre, description) => {
  try {
    const post = await findPostDB(_id);
    if (post.error) {
      return { error: post.error };
    }
    const date = moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DD HH:mm:ss');
    const editPost = await editPostDB(
      _id,
      name,
      type,
      state,
      description,
      genre,
      date,
    );
    
    return editPost;
  } catch (error) {
    return { error: error.message };
  }
};

const deletePost = async _id => {
  try {
    deletePostDB(_id);
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

module.exports = { createPost, findPost, editPost, deletePost };

const { Post } = require('../../models/Post');
const { User } = require('../../models/User');

const createPostDB = async (
  type,
  state,
  description,
  userId,
  genre,
  date,
  postImg
) => {
  console.log("TYPE", type, "STATE", state, "DESCRIPTION", description, "USERID", userId, "GENRE", genre, "DATE", date);
  try {
    const post = new Post({
      animal: type,
      postType: state,
      description,
      user: userId,
      genre,
      date,
      postImg
    });
    await post.save();
    console.log(post)
    // const userById = await User.findById(userId);
    // userById.posts.push(post);
    // await userById.save();

    return post;
  } catch (e){
    console.log(e.message);
    throw new Error(e.message);
  }
};

const findPostDB = async id => {
  try {
    console.log('id', id);
    const post = id ? await Post.findById(id) : await Post.find();
    return post;
  } catch {
    console.log('Error al buscar post');
    throw new Error('Mensaje');
  }
};

module.exports = {
  createPostDB,
  findPostDB,
};

const { Post } = require('../../models/Post');
const User = require('../../models/User');

const createPostDB = async (
  name,
  type,
  state,
  description,
  id,
  genre,
  date,
  petImage
) => {
  try {
    const post = new Post({
      name,
      type,
      state,
      description,
      user: id,
      genre,
      date,
      petImage,
    });
    await post.save();
    console.log('USER', id, User);
    const userById = await User.findById(id);

    userById.posts.push(post);
    await userById.save();

    return post;
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  }
};

const findPostDB = async id => {
  try {
    const post = id ? await Post.findById(id) : await Post.find();
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

const editPostDB = async (_id, name, type, state, description, genre, date) => {
  try {
    const post = await Post.findById(_id);
    
    post.name = name;
    post.type = type;
    post.state = state;
    post.description = description;
    post.genre = genre;
    post.date = date;
    await post.save();
    return post;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


module.exports = {
  createPostDB,
  findPostDB,
  editPostDB,
};

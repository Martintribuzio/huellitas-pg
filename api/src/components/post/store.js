const { Post } = require('../../models/Post');
const { User } = require('../../models/User');

const createPostDB = async (
  type,
  state,
  description,
  userId,
  genre,
  date,
  petImage
) => {
  try {
    const post = new Post({
      animal: type,
      postType: state,
      description,
      user: userId,
      genre,
      date,
      petImage
    });
    await post.save();
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
    const post = id ? await Post.findById(id) : await Post.find();
    return post;
  } catch (error){
    throw new Error(error);
  }
};

module.exports = {
  createPostDB,
  findPostDB,
};

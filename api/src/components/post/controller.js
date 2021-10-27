const { createPostDB } = require('./store')

const createPost = async (req, res) => {
  const { animal, postType, description, userId } = req.body
  const post = await createPostDB(animal, postType, description, userId)
  return res.json(post)
}

module.exports = { createPost }

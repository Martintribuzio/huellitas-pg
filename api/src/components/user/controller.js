const { createUserDB, postsByUserDB } = require('./store')

const createUser = async (req, res) => {
  const { name, email, password, postalCode } = req.body
  const user = await createUserDB(name, email, password, postalCode)
  return res.json(user)
}

const postsByUser = async (req, res) => {
  const { id } = req.body
  const posts = await postsByUserDB(id)
  return res.json(posts)
}

module.exports = {
  createUser,
  postsByUser,
}

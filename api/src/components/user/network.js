const userNetwork = require('express').Router();
const { createUser, postsByUser } = require('./controller');

userNetwork.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
});

userNetwork.get('/posts', async (req, res) => {
  try {
    const { id } = req.body;
    const posts = await postsByUser(id);
    return res.json(posts);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = userNetwork;

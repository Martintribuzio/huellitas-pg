const postNetwork = require('express').Router();
const { createPost } = require('./controller');

postNetwork.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body);
    return res.json(post);
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = postNetwork;

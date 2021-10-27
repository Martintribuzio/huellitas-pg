const postNetwork = require('express').Router();
const { createPost, findPost } = require('./controller');

postNetwork.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body);
    return res.json(post);
  } catch {
    return res.status(404).json({ message: 'Something went wrong' });
  }
});

postNetwork.get('/:id', async (req, res) => {
  try {
    console.log('id netw', req.params.id);
    const post = await findPost(req.params.id);
    return res.json(post);
  } catch {
    return res.status(404).json({ message: 'Something went wrong' });
  }
});

module.exports = postNetwork;

const postNetwork = require('express').Router();
const { createPost, findPost, editPost, deletePost } = require('./controller');
const fs = require('fs');

const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else cb(new Error('File must be a image (jpg,png)'), false);
};

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter,
});

postNetwork.post('/', upload.single('petImage'), async (req, res) => {
  console.log('bodyPost', req.body);
  try {
    const post = await createPost(req.body, req.file);
    return res.json(post);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

postNetwork.get('/', async (req, res) => {
  try {
    const post = await findPost(req.query.id);
    console.log(post);
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

postNetwork.put('/', async (req, res) => {
  try {
    const { _id, name, type, state, genre, description } = req.body;
    editPost(_id, name, type, state, genre, description);
    return res.send('post editado');
  } catch (error) {
    return res.send(error);
  }
});

postNetwork.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    deletePost(_id);
    return res.send('post eliminado');
  } catch (error) {
    return res.send(error);
  }
});

module.exports = postNetwork;

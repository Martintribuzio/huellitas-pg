const postNetwork = require('express').Router();
const { createPost, findPost, editPost, deletePost } = require('./controller');
const fs = require('fs');
const multer = require('multer');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync('./uploads')){
      console.log("PATH NOT FOUND")
      fs.mkdirSync('./uploads')
    } 
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '.' + file.mimetype.split('/')[1]);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else cb(new Error('File must be a image (jpg,png)'), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter,
});

postNetwork.post('/', upload.single('petImage'), async (req, res) => {
  console.log("bodyPost",req.body)
  try {
    const post = await createPost(req.body, req.file.path);
    return res.json(post);
  } catch (error) {
    console.log(error, error.message);
    return res.send(error);
  }
});

postNetwork.get('/', async (req, res) => {
  try {
    const post = await findPost(req.query.id);
    return res.json(post);
  } catch (error) {
    return res.send(error);
  }
});

postNetwork.put("/", async (req, res) => {
  try {
    const { _id, name, type, state, genre, description } = req.body;
    editPost(_id, name, type, state, genre, description);
    return res.send("post editado");
  } catch (error) {
    return res.send(error);
  }
});

postNetwork.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    deletePost(_id);
    return res.send("post eliminado");
  } catch (error) {
    return res.send(error);
  }
});

module.exports = postNetwork;

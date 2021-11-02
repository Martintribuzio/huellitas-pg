const postNetwork = require('express').Router();
const { createPost, findPost } = require('./controller');
const multer = require('multer');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uniqid());
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

module.exports = postNetwork;

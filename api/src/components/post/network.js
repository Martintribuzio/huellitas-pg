const postNetwork = require('express').Router();
const { createPost, findPost } = require('./controller');
const multer = require('multer')

console.log("POST MIDDLEWARE")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)
    else cb(new Error("File must be a image (jpg,png)"), false)
}

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter })


postNetwork.post('/', upload.single('petImage'), async (req, res) => {
  console.log("POST", req.body)
  
  try {
    const post = await createPost(req.body, req.file.path);
    return res.json(post);
  } catch (error) {
    return res.send(error);
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

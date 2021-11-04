require('../mongo');
const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const userNetwork = require('../components/user/network');
const postNetwork = require('../components/post/network');

const router = Router();
router.delete('/images', (req, res) => {
  const path = './uploads';
  try {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);

      if (files.length > 0) {
        files.forEach(function (filename) {
          if (fs.statSync(path + '/' + filename).isDirectory()) {
            removeDir(path + '/' + filename);
          } else {
            fs.unlinkSync(path + '/' + filename);
          }
        });
      }
    } else {
      console.log('Directory path not found.');
    }
    res.send('ok');
  } catch {
    console.log('Error');
    res.send('Error');
  }
});

router.use('/user', userNetwork);
router.use('/post', postNetwork);

module.exports = router;

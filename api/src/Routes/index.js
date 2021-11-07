require('../mongo');
const { Router } = require('express');
const userNetwork = require('../components/user/network');
const postNetwork = require('../components/post/network');
const conversationNetwork = require('../components/Conversation/network');
const messageNetwork = require('../components/Message/network');
const fs = require('fs');
const path = require('path');

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
      throw new Error('No existe el directorio');
    }
    res.send('ok');
  } catch {
    res.send('Error');
  }
});

router.use('/user', userNetwork);
router.use('/post', postNetwork);
router.use('/conversation', conversationNetwork);
router.use('/message', messageNetwork);

module.exports = router;

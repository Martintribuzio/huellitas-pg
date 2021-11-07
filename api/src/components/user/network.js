const userNetwork = require('express').Router();
const { createUser, postsByUser, getUserById } = require('./controller');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require('../../../authenticate');

const multer = require('multer');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uniqid('', file.originalname.split(' ').join('')));
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


userNetwork.get('/', async(req, res) => {
  try{
    const user = await getUserById(req.query);
    if(user){
      res.status(200).json(user)}
    else{res.status(404).send("usuario no encontradooooo")}
  }
  catch(err){
    res.status(400).send(err);}
});
//obtener los detalles del usuario que inició sesión
userNetwork.get('/me', verifyUser, (req, res, next) => {
  res.send(req.user);
});

userNetwork.get('/posts', async (req, res) => {
  try {
    const { id } = req.query;
    const posts = await postsByUser(id);
    return res.json(posts);
  } catch (err) {
    return res.json(err);
  }
});

//Registro
userNetwork.post('/signup', (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.email,
      postalCode: req.body.postalCode,
      picture: req.body.picture,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });

        user.refreshToken.push({ refreshToken });

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          }
        });
      }
    }
  );
});

//Login

userNetwork.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
            const user = {
              _id: req.user._id,
              name: req.user.name,
              lastname: req.user.lastname,
              username: req.user.username,
              postalCode: req.user.postalCode,
              picture: req.user.picture,
              token,
            };
            res.send({ success: true, user });
          }
        });
      },
      err => next(err)
    );
  } catch (err) {
    res.send(err);
  }
});

//LogOut
userNetwork.get('/logout', verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie('refreshToken', COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    err => next(err)
  );
});

//Ruta para refrescar el token
userNetwork.post('/refreshToken', (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        user => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send('Unauthorized');
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send('Unauthorized');
          }
        },
        err => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send('Unauthorized');
    }
  } else {
    res.statusCode = 401;
    res.send('Unauthorized');
  }
});

userNetwork.get('/', async (req, res) => {
  try {
    const user = await getUserById(req.query.id);
    console.log('user', user);
    if (user) {
      console.log('el martoooo');
      res.status(200).json({
        user,
        token: getToken({ _id: user._id }),
        refreshToken: getRefreshToken({ _id: user._id }),
      });
    } else {
      res.status(404).send('usuario no encontrado');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userNetwork;

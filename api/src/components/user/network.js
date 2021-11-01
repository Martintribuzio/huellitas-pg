const userNetwork = require('express').Router();
const { createUser, postsByUser } = require('./controller');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require('../../../authenticate');
<<<<<<< HEAD
console.log('ROUTE', getToken, COOKIE_OPTIONS, getRefreshToken);
=======

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

>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
// userNetwork.post('/', async (req, res) => {
//   try {
//     const user = await createUser(req.body);
//     return res.json(user);
//   } catch (err) {
//     return res.json(err); //Esta ruta se usa??
//   }
// });

userNetwork.get('/posts', async (req, res) => {
  try {
    const { id } = req.body;
    const posts = await postsByUser(id);
    return res.json(posts);
  } catch (err) {
    return res.json(err);
  }
});

// //TODO ESTO ES EL RUTEO DEL LOGIN/REGISTER
// //Landing Page
// userNetwork.get("/", (req,res) => {
//   res.send("Welcome")
// })
// //Profile home
// userNetwork.get("/home", (req,res) => {
//   res.send("Welcome to home")
// })

// // // Login Page
// userNetwork.get("/login", (req,res) => {
//   res.send("login")

// })
// userNetwork.post("/login", passport.authenticate("local-signin", {
//   successRedirect: "/user/home",
//   failureRedirect: "/user/login",
//   passReqToCallback: true
// }))

// // Register Page
// userNetwork.get("/signup", (req,res) => {

//   res.send("signup")
// })
// userNetwork.post("/signup", passport.authenticate("local-signup", {
//   successRedirect: "/user/login",
//   failureRedirect: "/user/signup",
//   passReqToCallback: true
// }));

// userNetwork.get('/logout', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

<<<<<<< HEAD
//Autenticacion para navegar entre páginas
function isLoggedIn(req, res, next) {
  console.log('REQ', req.isAuthenticated.toString());
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.send('ok');
}
=======
// //Autenticacion para navegar entre páginas
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/user/login');
// };

// userNetwork.get('/profile', isLoggedIn, (req, res, next) => {
//   res.render('profile')
// });
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0

userNetwork.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile');
});
//Registro
userNetwork.post('/signup', (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.email,
      postalCode: req.body.postalCode,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        console.log('NETWORK', err);
        res.send(err);
      } else {
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });

        user.refreshToken.push({ refreshToken });

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            console.log('NETWORK SAVE', err);
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
<<<<<<< HEAD

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

=======
userNetwork.post('/login', passport.authenticate('local'), (req, res, next) => {
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
          res.send({ success: true, token });
        }
      });
    },
    err => next(err)
  );
});

>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
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

//obtener los detalles del usuario que inició sesión
userNetwork.get('/me', verifyUser, (req, res, next) => {
  res.send(req.user);
});

module.exports = userNetwork;

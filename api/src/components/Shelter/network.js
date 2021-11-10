const shelterNetwork = require('express').Router();
const {postsByShelter} = require('./controller')
const fs = require('fs');
const passport = require('passport');
const Shelter = require('../../models/Shelter');
const jwt = require('jsonwebtoken');
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require('../../../authenticate');


shelterNetwork.get('/me', verifyUser, (req, res, next) => {
  res.send(req.shelter);
});


shelterNetwork.post('/signup', (req,res)=>{
    const {name,email,phone,address,website,facebook,instagram,description,profileImage,latitude,longitude} = req.body;
     Shelter.register( 
    new Shelter({
      name,
      username: email,
      phone,
      address,
      website,
      facebook,
      instagram,
      description,
      latitude,
      longitude,
    }),
    req.body.password,
    async (err, shelter) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        const token = getToken({ _id: shelter._id });
        const refreshToken = getRefreshToken({ _id: shelter._id });

        shelter.refreshToken.push({ refreshToken });

        if (profileImage) {
          const fileName = uniqid() + path.extname(profileImage.originalname);
          const fileRef = ref(storage, fileName);
          await uploadBytes(fileRef, profileImage.buffer);
    
          const url = await getDownloadURL(fileRef);
    
          const image = new Image({
            url,
            name: fileName,
          });
          image.save();
          shelter.profileImage = image;
        }

        shelter.save((err, shelter) => {
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



  shelterNetwork.get('/posts', async (req, res) => {
    try {
      const { id } = req.query;
      const posts = await postsByShelter(id);
      return res.json(posts);
    } catch (err) {
      return res.json(err);
    }
  });


  
  shelterNetwork.post('/login', passport.authenticate('local'), (req, res, next) => {
    try {
      const token = getToken({ _id: req.user._id });
      const refreshToken = getRefreshToken({ _id: req.user._id });
      Shelter.findById(req.user._id).then(
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
                username: req.user.username,
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

  shelterNetwork.get('/logout', verifyUser, (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    Shelter.findById(req.shelter._id).then(
      shelter => {
        const tokenIndex = shelter.refreshToken.findIndex(
          item => item.refreshToken === refreshToken
        );
  
        if (tokenIndex !== -1) {
          shelter.refreshToken.id(shelter.refreshToken[tokenIndex]._id).remove();
        }
  
        shelter.save((err, shelter) => {
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
  
  shelterNetwork.post('/refreshToken', (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
  
    if (refreshToken) {
      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const shelterId = payload._id;
        Shelter.findOne({ _id: shelterId }).then(
          shelter => {
            if (shelter) {
              // Find the refresh token against the shelter record in database
              const tokenIndex = shelter.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
              );
  
              if (tokenIndex === -1) {
                res.statusCode = 401;
                res.send('Unauthorized');
              } else {
                const token = getToken({ _id: userId });
                // If the refresh token exists, then create new one and replace it.
                const newRefreshToken = getRefreshToken({ _id: userId });
                shelter.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                shelter.save((err, shelter) => {
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

  module.exports = shelterNetwork;
const shelterNetwork = require('express').Router();

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


shelterNetwork.post('/signup',(req,res)=>{
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
      picture :profileImage,
      latitude,
      longitude,
    }),
    req.body.password,
    (err, shelter) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        const token = getToken({ _id: shelter._id });
        const refreshToken = getRefreshToken({ _id: shelter._id });

        shelter.refreshToken.push({ refreshToken });

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


  
  shelterNetwork.post('/login', passport.authenticate('local'), (req, res, next) => {
    try {
      const token = getToken({ _id: req.shelter._id });
      const refreshToken = getRefreshToken({ _id: req.shelter._id });
      Shelter.findById(req.shelter._id).then(
        shelter => {
          shelter.refreshToken.push({ refreshToken });
          shelter.save((err, shelter) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
              const shelter = {
                _id: req.shelter._id,
                name: req.shelter.name,
                username: req.shelter.username,
                phone: req.shelter.phone,
                address: req.shelter.address,
                website: req.shelter.website,
                facebook: req.shelter.facebook,
                instagram: req.shelter.instagram,
                description: req.shelter.description,
                picture: req.shelter.picture,
                latitude: req.shelter.latitude,
                longitude: req.shelter.longitude,
                token,
              };
              res.send({ success: true, shelter });
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
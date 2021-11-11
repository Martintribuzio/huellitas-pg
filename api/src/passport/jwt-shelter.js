const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Shelter = require('../models/Shelter');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch shelter details in each request.
    Shelter.findOne({ _id: jwt_payload._id }, function (err, shelter) {
      if (err) {
        return done(err, false);
      }
      if (shelter) {
        return done(null, shelter);
      } else {
        return done(null, false);
      }
    });
  })
);

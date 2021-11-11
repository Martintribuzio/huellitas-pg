const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
<<<<<<< HEAD
=======

>>>>>>> 53bc6c8781f40a0c73beacb0e2b05289d557078f

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

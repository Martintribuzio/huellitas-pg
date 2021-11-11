const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const Shelter = require('../models/Shelter');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(Shelter.authenticate()));
passport.serializeUser(Shelter.serializeUser());
passport.deserializeUser(Shelter.deserializeUser());

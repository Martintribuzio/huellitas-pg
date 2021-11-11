const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Shelter = require('../models/Shelter');

passport.use(new LocalStrategy(Shelter.authenticate()));
passport.serializeUser(Shelter.serializeUser());
passport.deserializeUser(Shelter.deserializeUser());

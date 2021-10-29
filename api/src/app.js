const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const route = require('./Routes/index')
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//Extra configs
app.use(session({
  secret: "mysecretsession",
  resave: false,
  saveUninitialized: false
})); //Investigar en Documentacion de session!!
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.user = req.user;
  next();
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/',route);


module.exports = app
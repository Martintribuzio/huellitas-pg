const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./Routes/index');
const passport = require('passport');

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

require('./passport/jwt');
require('./passport/local-auth');
require('../authenticate');
dotenv.config();

app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"))
app.use('/', route);

module.exports = app;

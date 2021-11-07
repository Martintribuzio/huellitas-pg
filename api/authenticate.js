const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const dev = process.env.NODE_ENV !== 'production';

dotenv.config();

COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: 'none',
};

getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

verifyUser = passport.authenticate('jwt', { session: false });

module.exports = {
  COOKIE_OPTIONS,
  getToken,
  getRefreshToken,
  verifyUser,
}


const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./Routes/index');
const passport = require('passport');
// const Sentry = require('@sentry/node');
// const Tracing = require('@sentry/tracing');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Sentry.init({
//   dsn: 'https://0985f26037e44b6eb67b5d5bbb39fe50@o1067931.ingest.sentry.io/6062068',
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 0,
// });

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

require('./passport/jwt');
require('./passport/local-auth');
require('../authenticate');
dotenv.config();

app.use(passport.initialize());
app.use(morgan('dev'));
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
// SENTRY ERROR TRACKING
// app.use(Sentry.Handlers.requestHandler());
// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here

app.use('/', route);
// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + '\n');
// });

// FIN DE SENTRY ERROR TRACKING

module.exports = app;

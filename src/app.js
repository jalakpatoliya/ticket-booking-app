const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('volleyball');
const passport = require('passport');
const UserRoute = require('./routes/User/UserRoute');
const TheatreRoute = require('./routes/Theatre/TheatreRoute');
const ScreenRoute = require('./routes/Screen/ScreenRoute');
const MovieRoute = require('./routes/Movie/MovieRoute');
require('./auth/auth');

app.use(cors());
app.use(logger);

/**
 * Routes
 */
app.use('/api/', UserRoute);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/api/theatre', passport.authenticate('jwt', { session: false }), TheatreRoute);
app.use('/api/screen', passport.authenticate('jwt', { session: false }), ScreenRoute);
app.use('/api/movie', passport.authenticate('jwt', { session: false }), MovieRoute);

//Handle errors
// eslint-disable-next-line no-unused-vars
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error: err });
// });

module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const UserRoute = require('./routes/User/UserRoute');
const TheatreRoute = require('./routes/Theatre/TheatreRoute');
require('./auth/auth');

app.use(cors());
/**
 * Routes
 */
app.use('/api/', UserRoute);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/api/contact', passport.authenticate('jwt', { session: false }), TheatreRoute);

//Handle errors
// eslint-disable-next-line no-unused-vars
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error: err });
// });

module.exports = app;

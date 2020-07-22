const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bodyParser = require('body-parser');
const userCtrl = require('./UserController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, 'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/user/bookings', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { user } = req;
    const data = await userCtrl.getBookings({ user });
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});
module.exports = router;

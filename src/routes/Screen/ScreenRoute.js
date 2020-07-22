const router = require('express').Router();
const bodyParser = require('body-parser');
const Screen = require('../../models/Screen');
const User = require('../../models/User');
const screentCtrl = require('./ScreenController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Screen
 */
router.post('/create', async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, theatreId, seatArrangement } = req.body;

    //check if user is owner of theatre
    // const isOwner = await screentCtrl.checkTheatreOwnership({ userId, theatreId });

    //create screen
    const data = await screentCtrl.createScreen({ name, theatreId, userId, seatArrangement });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get screen with seat arrangement and booked seats for particular date
 */
router.post('/seats', async (req, res) => {
  try {
    const { date, screenId } = req.body;

    //get seats for screen
    const data = await screentCtrl.getSeats({ date, screenId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get screens showing a movie on given date
 */
// router.post('/movie', async (req, res) => {
//   try {
//     const { date, movieId } = req.body;

//     //get screens running movie on given date
//     const data = await screentCtrl.getScreensRunningMovie({ date, movieId });

//     return res.status(200).json({ status: 'success', data });
//   } catch (error) {
//     res.status(500).json({ status: 'fail', error: error.message });
//   }
// });

/**
 * Get screens of theatre running movie on particular date
 */
router.post('/theatre', async (req, res) => {
  try {
    const { date, movieId, theatreId } = req.body;

    //get screens of theatre running movie on given date
    const data = await screentCtrl.getScreensOfTheatreRunningMovie({ date, movieId, theatreId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;

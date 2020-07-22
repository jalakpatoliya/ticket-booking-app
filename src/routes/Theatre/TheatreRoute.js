const router = require('express').Router();
const bodyParser = require('body-parser');
const Theatre = require('../../models/Theatre');
const User = require('../../models/User');
const theatreCtrl = require('./TheatreController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Theatre
 */
router.post('/create', async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Theatre.create({ ...req.body, owner: userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get theatres running movie on particular date
 */
router.post('/movie', async (req, res) => {
  try {
    const { date, movieId } = req.body;

    //get screens of theatre running movie on given date
    const data = await theatreCtrl.getTheatreRunningMovie({ date, movieId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;

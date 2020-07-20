const router = require('express').Router();
const bodyParser = require('body-parser');
const Movie = require('../../models/Movie');
const movieCtrl = require('./MovieController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Movie
 */
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;

    //create movie
    const data = await Movie.create({ name });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Add Movie to Screens
 */
router.post('/screen', async (req, res) => {
  try {
    const { movieId, screenId, from, to } = req.body;

    //add movie to screen
    const data = await movieCtrl.addMovieToScreen({ movieId, screenId, from, to });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get Movies running today
 */
router.post('/list', async (req, res) => {
  try {
    const { date } = req.body;

    //get movie running on given date
    const data = await movieCtrl.getMoviesRunning({ date });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;

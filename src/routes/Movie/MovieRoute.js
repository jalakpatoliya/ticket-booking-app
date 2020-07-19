const router = require('express').Router();
const bodyParser = require('body-parser');
const Movie = require('../../models/Movie');

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

module.exports = router;

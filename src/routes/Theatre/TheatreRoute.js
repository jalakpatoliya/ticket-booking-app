const router = require('express').Router();
const bodyParser = require('body-parser');
const Theatre = require('../../models/Theatre');
const User = require('../../models/User');

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

module.exports = router;

const router = require('express').Router();
const bodyParser = require('body-parser');
const Contact = require('../../models/Theatre');
const User = require('../../models/User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Theatre
 */
router.post('/create', async (req, res) => {
  try {
    const userId = req.user._id;
    const { _id: contactId } = await Contact.create({ ...req.body, creator: userId });

    const data = await User.findByIdAndUpdate(
      userId,
      { $push: { contacts: contactId } },
      { new: true, useFindAndModify: false }
    );
    // const data2 = await User.findById(userId);

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get All Theatre
 */
router.get('/all', async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Contact.find({ creator: userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;

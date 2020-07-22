const router = require('express').Router();
const bodyParser = require('body-parser');
const seatCtrl = require('./SeatController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Book seats
 */
router.post('/book', async (req, res) => {
  try {
    const { seatId, rows, date, screenId, theatreId } = req.body;
    const userId = req.user._id;

    // const data = await seatCtrl.bookSeats({ seatId, rows, userId, date, screenId, theatreId });
    return res.status(200).json({ status: 'success', data: req.body });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;

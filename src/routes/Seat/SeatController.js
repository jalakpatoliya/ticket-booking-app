const Seat = require('../../models/Seat');
const User = require('../../models/User');

exports.bookSeats = async ({ seatId, rows, userId, screenId, theatreId, date }) => {
  try {
    //updating bookings in screen's seatings
    const updatingArr = await rows.map(async (row) => {
      const { rowId, index } = row;
      return Seat.update(
        { _id: seatId, 'rows._id': rowId },
        {
          $push: {
            'rows.$.booked': {
              index: index,
              userId: userId,
            },
          },
        }
      );
    });

    let data = await Promise.all(updatingArr);

    //adding bookings in user
    data = await User.findByIdAndUpdate(userId, {
      $push: {
        bookings: {
          date,
          screenId,
          theatreId,
          seatId,
          rows,
        },
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

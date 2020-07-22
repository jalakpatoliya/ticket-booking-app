const UserModel = require('../../models/User');
const mongoose = require('mongoose');

exports.getBookings = async ({ user }) => {
  try {
    const { bookings } = await UserModel.findById(user._id)
      .populate('bookings.rows._id')
      .populate('bookings.theatreId', 'name')
      .populate('bookings.screenId', 'name');

    const tickets = bookings.map((booking) => {
      const {
        screenId: { name: screenName },
        theatreId: { name: theatreName },
        date,
        rows,
      } = booking;
      const rowName = rows[0].rowName;
      const seatNumber = rows[0].index.toString();
      return (ticket = {
        date,
        theatreName,
        screenName,
        rowName,
        seatNumber,
      });
    });

    return tickets;
  } catch (error) {
    throw new Error(error.message);
  }
};

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

      let seatNumber = ``;
      rows.map((row) => {
        seatNumber += `${row.rowName}${row.index.toString()},`;
      });
      seatNumber = seatNumber.substring(0, seatNumber.length - 1);

      return (ticket = {
        date,
        theatreName,
        screenName,
        seatNumber,
      });
    });

    return tickets;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Screen = require('../../models/Screen');
const Theatre = require('../../models/Theatre');
const Booking = require('../../models/Booking');
const Seat = require('../../models/Seat');

exports.checkTheatreOwnership = async ({ userId, theatreId }) => {
  try {
    const data = await Theatre.find({ _id: theatreId, owner: userId });
    if (!data) {
      throw new Error('User is not owner of theatre!');
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createScreen = async ({ name, theatreId, seatArrangement }) => {
  try {
    const data = await Screen.create({ name, theatre: theatreId, seatArrangement });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getSeats = async ({ date, screenId }) => {
  try {
    //check if bookings are made on that date
    let data = await Screen.findOne({ _id: screenId }).populate({
      path: 'bookings',
      match: { date: new Date(date) },
      populate: {
        path: 'seats',
      },
    });

    //if no bookings, create new booking
    if (data.bookings.length == 0) {
      //getseatArrangement of screen
      const { seatArrangement } = await Screen.findOne(
        { _id: screenId },
        { 'seatArrangement._id': 0 }
      );

      //create seats in Seat
      // data = seatArrangement;
      const { _id: seatId } = await Seat.create({
        rows: seatArrangement,
      });

      //create booking object
      const bookingObj = {
        date,
        seats: seatId,
      };

      //make booking entry
      const bookingData = await Booking.create(bookingObj);

      //insert booking in screen
      data = await Screen.findByIdAndUpdate(
        screenId,
        { $push: { bookings: bookingData._id } },
        { new: true }
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

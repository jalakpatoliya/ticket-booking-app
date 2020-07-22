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
      ).populate('screen.bookings');

      //getting back the same booking back as findByIdAndUpadate and .populate will not work simultaneously
      data = await Screen.findOne({ _id: screenId }).populate({
        path: 'bookings',
        match: { date: new Date(date) },
        populate: {
          path: 'seats',
        },
      });
    }

    // return data;

    //converting to required form
    const convertedData = await convertData({
      seatArrangement: data.seatArrangement,
      bookings: data.bookings,
    });

    const newData = { seatData: convertedData, allData: data };

    return newData;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function convertData({ seatArrangement, bookings }) {
  const rows = [];

  //if no bookings then make empty hall
  if (typeof bookings[0] == 'string') {
    //from seatArrangement
    seatArrangement.map((row) => {
      const { seats, rowName, _id } = row;
      for (let i = 0; i < seats; i++) {
        const seat = {
          id: `${_id},${rowName},${i}`,
          number: i,
          tooltip: '$50',
        };
        innerRow.push(seat);
      }
      rows.push(innerRow);
    });
  } else {
    //if bookings exists
    bookings[0].seats.rows.map((row) => {
      const { seats, rowName, _id, booked } = row;
      const innerRow = [];
      const bookedArr = [];
      booked.map(({ index }) => {
        bookedArr.push(...index);
      });
      for (let i = 0; i < seats; i++) {
        const seat = {
          id: `${_id},${rowName},${i}`,
          number: i,
          tooltip: '$50',
        };
        if (bookedArr.indexOf(i) !== -1) {
          seat.isReserved = true;
        }
        innerRow.push(seat);
      }
      rows.push(innerRow);
    });
  }

  // console.log(rows);
  return rows;
}

// exports.getScreensRunningMovie = async ({ date = new Date(), movieId }) => {
//   try {
//     const data = await Screen.find({
//       'movies.movie': movieId,
//       'movies.from': { $lte: new Date(date) },
//       'movies.to': { $gte: new Date(date) },
//     })
//       .populate('theatre')
//       .select('-seatArrangement -bookings');

//     const theatres = data.map((screen) => ({
//       theatreId: screen.theatre._id,
//       name: screen.theatre.name,
//     }));

//     return theatres;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

exports.getScreensOfTheatreRunningMovie = async ({ date = new Date(), movieId, theatreId }) => {
  try {
    const data = await Screen.find({
      'movies.movie': movieId,
      'movies.from': { $lte: new Date(date) },
      'movies.to': { $gte: new Date(date) },
      theatre: theatreId,
    }).select('-seatArrangement -bookings -movies -createdAt -updatedAt');

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

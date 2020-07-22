const Screen = require('../../models/Screen');

exports.getTheatreRunningMovie = async ({ date = new Date(), movieId }) => {
  try {
    const data = await Screen.find({
      'movies.movie': movieId,
      'movies.from': { $lte: new Date(date) },
      'movies.to': { $gte: new Date(date) },
    })
      .populate('theatre')
      .select('-seatArrangement -bookings');

    const theatres = data.map((screen) => ({
      theatreId: screen.theatre._id,
      name: screen.theatre.name,
    }));

    return theatres;
  } catch (error) {
    throw new Error(error.message);
  }
};

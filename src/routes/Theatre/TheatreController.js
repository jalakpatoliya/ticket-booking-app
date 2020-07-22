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

    // filter unique theatres
    const uniq = {};
    let theatres = data.filter((theatre) => {
      if (uniq[theatre.theatre._id]) {
        return false;
      }
      uniq[theatre.theatre._id] = true;
      return true;
    });

    theatres = theatres.map((theatre) => ({
      theatreId: theatre.theatre._id,
      name: theatre.theatre.name,
    }));

    return theatres;
  } catch (error) {
    throw new Error(error.message);
  }
};

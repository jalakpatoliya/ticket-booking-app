const Movie = require('../../models/Movie');
const Screen = require('../../models/Screen');

/**
 * Add movie to screens
 */
exports.addMovieToScreen = async ({ movieId, screenId, from, to }) => {
  try {
    //add screen to movie
    let data = await Movie.findByIdAndUpdate(
      movieId,
      {
        $push: {
          screens: {
            screen: screenId,
            from,
            to,
          },
        },
      },
      { new: true }
    );

    //add movie to screen
    data = await Screen.findByIdAndUpdate(
      screenId,
      {
        $push: {
          movies: {
            movie: movieId,
            from,
            to,
          },
        },
      },
      { new: true }
    );

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get movies running on given date
 */

exports.getMoviesRunning = async ({ date = new Date() }) => {
  try {
    const data = await Movie.find({
      'screens.from': { $lte: new Date(date) },
      'screens.to': { $gte: new Date(date) },
    }).select('-screens');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get all theatres running the movie on given date
 */
exports.getMoviesRunning = async ({ date = new Date() }) => {
  try {
    const data = await Movie.find({
      'screens.from': { $lte: new Date(date) },
      'screens.to': { $gte: new Date(date) },
    }).select('-screens');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

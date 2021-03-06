const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  screens: [
    {
      screen: {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
      },
      from: Date,
      to: Date,
    },
  ],
});

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;

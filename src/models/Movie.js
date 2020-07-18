const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    screens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
      },
    ],
  },
  { timestamps: true }
);

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;

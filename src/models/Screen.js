const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreenSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    movies: [
      {
        movie: {
          type: Schema.Types.ObjectId,
          ref: 'Movie',
        },
        from: Date,
        to: Date,
      },
    ],
    theatre: {
      type: Schema.Types.ObjectId,
      ref: 'Theatre',
    },
    seatArrangement: [
      {
        rowName: {
          type: String,
          required: true,
        },
        seats: {
          type: Number,
          required: true,
        },
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  { timestamps: true }
);

const ScreenModel = mongoose.model('Screen', ScreenSchema);

module.exports = ScreenModel;

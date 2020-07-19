const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  rows: [
    {
      rowName: String,
      seats: Number,
      booked: [
        {
          index: [],
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
    },
  ],
});

const SeatModel = mongoose.model('Seat', SeatSchema);

module.exports = SeatModel;

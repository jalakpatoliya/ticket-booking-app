const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
  },
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;

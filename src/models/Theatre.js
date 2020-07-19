const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheatreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    screens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const TheatreModel = mongoose.model('Theatre', TheatreSchema);

module.exports = TheatreModel;

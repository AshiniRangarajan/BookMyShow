const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  row: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'reserved'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Seat', seatSchema);

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: [String],
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'Tamil'
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);

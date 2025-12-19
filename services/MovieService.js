const Movie = require('../models/Movie');

class MovieService {
  async createMovie(movieData) {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
  }

  async getAllMovies() {
    return await Movie.find({ language: 'Tamil' }); // Focus on Tamil movies
  }

  async getMovieById(id) {
    return await Movie.findById(id);
  }

  async updateMovie(id, updateData) {
    return await Movie.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
  }
}

module.exports = new MovieService();

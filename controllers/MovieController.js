const MovieService = require('../services/MovieService');

class MovieController {
  static async createMovie(req, res) {
    try {
      const movieData = req.body;
      const movie = await MovieService.createMovie(movieData);
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllMovies(req, res) {
    try {
      const movies = await MovieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMovieById(req, res) {
    try {
      const movie = await MovieService.getMovieById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateMovie(req, res) {
    try {
      const movie = await MovieService.updateMovie(req.params.id, req.body);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json(movie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteMovie(req, res) {
    try {
      const movie = await MovieService.deleteMovie(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;

const ShowService = require('../services/ShowService');

class ShowController {
  static async createShow(req, res) {
    try {
      const showData = req.body;
      const show = await ShowService.createShow(showData);
      res.status(201).json(show);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllShows(req, res) {
    try {
      const shows = await ShowService.getAllShows();
      res.json(shows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShowById(req, res) {
    try {
      const show = await ShowService.getShowById(req.params.id);
      if (!show) return res.status(404).json({ message: 'Show not found' });
      res.json(show);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShowsByMovie(req, res) {
    try {
      const shows = await ShowService.getShowsByMovie(req.params.movieId);
      res.json(shows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShowsByTheatre(req, res) {
    try {
      const shows = await ShowService.getShowsByTheatre(req.params.theatreId);
      res.json(shows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateShow(req, res) {
    try {
      const show = await ShowService.updateShow(req.params.id, req.body);
      if (!show) return res.status(404).json({ message: 'Show not found' });
      res.json(show);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteShow(req, res) {
    try {
      const show = await ShowService.deleteShow(req.params.id);
      if (!show) return res.status(404).json({ message: 'Show not found' });
      res.json({ message: 'Show deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ShowController;

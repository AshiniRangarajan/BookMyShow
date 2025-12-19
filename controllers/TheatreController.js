const TheatreService = require('../services/TheatreService');

class TheatreController {
  static async createTheatre(req, res) {
    try {
      const theatreData = req.body;
      const theatre = await TheatreService.createTheatre(theatreData);
      res.status(201).json(theatre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllTheatres(req, res) {
    try {
      const theatres = await TheatreService.getAllTheatres();
      res.json(theatres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTheatreById(req, res) {
    try {
      const theatre = await TheatreService.getTheatreById(req.params.id);
      if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
      res.json(theatre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTheatre(req, res) {
    try {
      const theatre = await TheatreService.updateTheatre(req.params.id, req.body);
      if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
      res.json(theatre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTheatre(req, res) {
    try {
      const theatre = await TheatreService.deleteTheatre(req.params.id);
      if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
      res.json({ message: 'Theatre deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TheatreController;

const Theatre = require('../models/Theatre');

class TheatreService {
  async createTheatre(theatreData) {
    const theatre = new Theatre(theatreData);
    await theatre.save();
    return theatre;
  }

  async getAllTheatres() {
    return await Theatre.find();
  }

  async getTheatreById(id) {
    return await Theatre.findById(id);
  }

  async updateTheatre(id, updateData) {
    return await Theatre.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTheatre(id) {
    return await Theatre.findByIdAndDelete(id);
  }
}

module.exports = new TheatreService();

const Show = require('../models/Show');

class ShowService {
  async createShow(showData) {
    const show = new Show(showData);
    await show.save();
    return show;
  }

  async getAllShows() {
    return await Show.find().populate('movie theatre');
  }

  async getShowById(id) {
    return await Show.findById(id).populate('movie theatre');
  }

  async getShowsByMovie(movieId) {
    return await Show.find({ movie: movieId }).populate('movie theatre');
  }

  async getShowsByTheatre(theatreId) {
    return await Show.find({ theatre: theatreId }).populate('movie theatre');
  }

  async updateShow(id, updateData) {
    return await Show.findByIdAndUpdate(id, updateData, { new: true }).populate('movie theatre');
  }

  async deleteShow(id) {
    return await Show.findByIdAndDelete(id);
  }
}

module.exports = new ShowService();

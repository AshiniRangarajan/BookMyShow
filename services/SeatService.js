const Seat = require('../models/Seat');

class SeatService {
  async createSeat(seatData) {
    const seat = new Seat(seatData);
    await seat.save();
    return seat;
  }

  async getAllSeats() {
    return await Seat.find().populate('theatre show');
  }

  async getSeatById(id) {
    return await Seat.findById(id).populate('theatre show');
  }

  async getSeatsByShow(showId) {
    return await Seat.find({ show: showId }).populate('theatre show');
  }

  async updateSeat(id, updateData) {
    return await Seat.findByIdAndUpdate(id, updateData, { new: true }).populate('theatre show');
  }

  async deleteSeat(id) {
    return await Seat.findByIdAndDelete(id);
  }

  async bookSeat(seatId) {
    return await Seat.findByIdAndUpdate(seatId, { status: 'booked' }, { new: true });
  }

  async releaseSeat(seatId) {
    return await Seat.findByIdAndUpdate(seatId, { status: 'available' }, { new: true });
  }
}

module.exports = new SeatService();

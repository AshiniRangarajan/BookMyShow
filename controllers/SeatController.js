const SeatService = require('../services/SeatService');

class SeatController {
  static async createSeat(req, res) {
    try {
      const seatData = req.body;
      const seat = await SeatService.createSeat(seatData);
      res.status(201).json(seat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllSeats(req, res) {
    try {
      const seats = await SeatService.getAllSeats();
      res.json(seats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getSeatById(req, res) {
    try {
      const seat = await SeatService.getSeatById(req.params.id);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
      res.json(seat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getSeatsByShow(req, res) {
    try {
      const seats = await SeatService.getSeatsByShow(req.params.showId);
      res.json(seats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateSeat(req, res) {
    try {
      const seat = await SeatService.updateSeat(req.params.id, req.body);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
      res.json(seat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteSeat(req, res) {
    try {
      const seat = await SeatService.deleteSeat(req.params.id);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
      res.json({ message: 'Seat deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async bookSeat(req, res) {
    try {
      const seat = await SeatService.bookSeat(req.params.id);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
      res.json(seat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async releaseSeat(req, res) {
    try {
      const seat = await SeatService.releaseSeat(req.params.id);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
      res.json(seat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = SeatController;

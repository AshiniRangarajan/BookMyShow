const BookingService = require('../services/BookingService');

class BookingController {
  static async createBooking(req, res) {
    try {
      const bookingData = req.body;
      const booking = await BookingService.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllBookings(req, res) {
    try {
      const bookings = await BookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookingById(req, res) {
    try {
      const booking = await BookingService.getBookingById(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookingsByUser(req, res) {
    try {
      const bookings = await BookingService.getBookingsByUser(req.params.userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cancelBooking(req, res) {
    try {
      const booking = await BookingService.cancelBooking(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = BookingController;

const Booking = require('../models/Booking');
const SeatService = require('./SeatService');

class BookingService {
  async createBooking(bookingData) {
    const { user, show, seats } = bookingData;

    // Check if seats are available
    for (const seatId of seats) {
      const seat = await SeatService.getSeatById(seatId);
      if (!seat || seat.status !== 'available') {
        throw new Error(`Seat ${seatId} is not available`);
      }
    }

    // Book seats
    for (const seatId of seats) {
      await SeatService.bookSeat(seatId);
    }

    // Calculate total price (assuming price from show)
    const showDoc = await require('../models/Show').findById(show);
    const totalPrice = showDoc.price * seats.length;

    const booking = new Booking({
      user,
      show,
      seats,
      totalPrice
    });

    await booking.save();
    return booking.populate('user show seats');
  }

  async getAllBookings() {
    return await Booking.find().populate('user show seats');
  }

  async getBookingById(id) {
    return await Booking.findById(id).populate('user show seats');
  }

  async getBookingsByUser(userId) {
    return await Booking.find({ user: userId }).populate('user show seats');
  }

  async cancelBooking(id) {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Release seats
    for (const seatId of booking.seats) {
      await SeatService.releaseSeat(seatId);
    }

    booking.status = 'cancelled';
    await booking.save();
    return booking.populate('user show seats');
  }
}

module.exports = new BookingService();

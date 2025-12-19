const express = require('express');
const BookingController = require('../controllers/BookingController');
const router = express.Router();

router.post('/', BookingController.createBooking);
router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getBookingById);
router.get('/user/:userId', BookingController.getBookingsByUser);
router.put('/:id/cancel', BookingController.cancelBooking);

module.exports = router;

const express = require('express');
const SeatController = require('../controllers/SeatController');
const router = express.Router();

router.post('/', SeatController.createSeat);
router.get('/', SeatController.getAllSeats);
router.get('/:id', SeatController.getSeatById);
router.get('/show/:showId', SeatController.getSeatsByShow);
router.put('/:id', SeatController.updateSeat);
router.delete('/:id', SeatController.deleteSeat);
router.put('/:id/book', SeatController.bookSeat);
router.put('/:id/release', SeatController.releaseSeat);

module.exports = router;

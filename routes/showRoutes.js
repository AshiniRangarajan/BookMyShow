const express = require('express');
const ShowController = require('../controllers/ShowController');
const router = express.Router();

router.post('/', ShowController.createShow);
router.get('/', ShowController.getAllShows);
router.get('/:id', ShowController.getShowById);
router.get('/movie/:movieId', ShowController.getShowsByMovie);
router.get('/theatre/:theatreId', ShowController.getShowsByTheatre);
router.put('/:id', ShowController.updateShow);
router.delete('/:id', ShowController.deleteShow);

module.exports = router;

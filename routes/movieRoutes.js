const express = require('express');
const MovieController = require('../controllers/MovieController');
const router = express.Router();

router.post('/', MovieController.createMovie);
router.get('/', MovieController.getAllMovies);
router.get('/:id', MovieController.getMovieById);
router.put('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);

module.exports = router;

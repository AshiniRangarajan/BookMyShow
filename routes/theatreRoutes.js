const express = require('express');
const TheatreController = require('../controllers/TheatreController');
const router = express.Router();

router.post('/', TheatreController.createTheatre);
router.get('/', TheatreController.getAllTheatres);
router.get('/:id', TheatreController.getTheatreById);
router.put('/:id', TheatreController.updateTheatre);
router.delete('/:id', TheatreController.deleteTheatre);

module.exports = router;

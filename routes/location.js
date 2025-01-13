const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/locationController');

router.get('/locations', LocationController.getAllLocations);

module.exports = router;
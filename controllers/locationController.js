const Location = require('../models/location');

class LocationController {
  static async getAllLocations(req, res, next) {
    try {
      const locations = await Location.find()
        .select('name createdDate')
        .sort({ name: 1 });

      res.status(200).json({
        count: locations.length,
        locations
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LocationController;
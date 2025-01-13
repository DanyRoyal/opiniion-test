const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { locationId } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return res.status(400).json({
      error: 'Invalid locationId format'
    });
  }
  next();
};

const validateDateRange = (req, res, next) => {
  const { startDate, endDate } = req.body;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      error: 'Invalid date format. Please use ISO 8601 format (YYYY-MM-DD)'
    });
  }
  
  if (start > end) {
    return res.status(400).json({
      error: 'startDate must be before or equal to endDate'
    });
  }
  
  next();
};

module.exports = {
  validateObjectId,
  validateDateRange
};
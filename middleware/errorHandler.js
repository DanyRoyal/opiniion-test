const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Validation Error',
        details: Object.values(err.errors).map(error => error.message)
      });
    }
  
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        error: 'Invalid ID format'
      });
    }
  
    res.status(err.status || 500).json({
      error: err.message || 'Something went wrong!'
    });
  };
  
  module.exports = errorHandler;
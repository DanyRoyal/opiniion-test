const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);
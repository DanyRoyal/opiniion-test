const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customer', customerSchema);
const mongoose = require('mongoose');

const customerLogSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomerLog', customerLogSchema);
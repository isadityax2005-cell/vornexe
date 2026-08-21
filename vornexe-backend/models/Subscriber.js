const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false
  },
  agreedToPolicy: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);

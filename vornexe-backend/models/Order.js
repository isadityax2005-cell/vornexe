const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  shippingDetails: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pinCode: String
  },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  status: { type: String, default: 'Pending Verification' },
  discountCode: { type: String, default: '' },
  finalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Order', orderSchema);

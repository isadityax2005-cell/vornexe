const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  isSoldOut: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Since the frontend currently expects `id` instead of `_id`, we'll add a virtual getter
productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Product', productSchema);

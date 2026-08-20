const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false },
  size: { type: String, required: false },
  isSoldOut: { type: Boolean, default: false },
  imageUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Product', productSchema);

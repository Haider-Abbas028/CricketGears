const mongoose = require('mongoose');

// Product ke price options
const priceOptionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

// Product ka schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  priceOptions: [priceOptionSchema],
  createdAt: { type: Date, default: Date.now },
}, { collection: 'product' });

module.exports = mongoose.model('Product', productSchema);
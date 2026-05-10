const mongoose = require('mongoose');

// Order ka data schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  shippingAddress: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
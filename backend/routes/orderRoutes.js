const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendEmail } = require('../config/emailConfig');
const { getOrderConfirmationTemplate } = require('../utils/emailTemplates');

// Naya order create karta hai
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);

    const orderDetails = {
      orderId: order._id,
      customerName: order.customerName,
      shippingAddress: order.shippingAddress,
      items: order.items,
      totalAmount: order.totalAmount,
    };

    const emailHtml = getOrderConfirmationTemplate(orderDetails);
    await sendEmail(
      order.customerEmail,
      `Order Confirmation - ${order._id.toString().slice(-8)}`,
      emailHtml
    );

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Orders list laata hai, email se filter ho sakta hai
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let filter = {};
    if (email) {
      filter.customerEmail = email;
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Order status update karta hai
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ek order ID se laata hai
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
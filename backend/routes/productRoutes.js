const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Products list laata hai, filter bhi kar sakta hai
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, brand } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter['priceOptions.0.price'] = {};
      if (minPrice) {
        filter['priceOptions.0.price'].$gte = parseInt(minPrice);
      }
      if (maxPrice) {
        filter['priceOptions.0.price'].$lte = parseInt(maxPrice);
      }
    }

    const products = await Product.find(filter);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ek product deta hai ID se
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Naya product banata hai
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Product update karta hai
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Product delete karta hai
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
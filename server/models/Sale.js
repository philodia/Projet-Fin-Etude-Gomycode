// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Sale', saleSchema);

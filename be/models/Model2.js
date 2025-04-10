const mongoose = require('mongoose');

const Model2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name2: {
    type: String
  },
  number: {
    type: Number
  },
  price: {
    type: Number
  },
  size: {
    type: String
  },
  discount: {
    type: Number
  }
}, { collection: 'items' });

module.exports = Model = mongoose.model('item', Model2Schema);
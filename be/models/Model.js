const mongoose = require('mongoose');

const RowsSchema = new mongoose.Schema({
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
});

const ModelSchema = new mongoose.Schema({
  items: [RowsSchema],
  date: Date
}, { collection: 'transactions' });

module.exports = Model = mongoose.model('transaction', ModelSchema);
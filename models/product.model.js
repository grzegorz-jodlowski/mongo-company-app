const mongoose = require('mongoose');

const productScheme = mongoose.Schema({
  name: { type: String, require: true },
  client: { type: String, require: true },
});

module.exports = mongoose.model('Product', productScheme);
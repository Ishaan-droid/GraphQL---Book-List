const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the author is required.'],
  },
  age: {
    type: Number,
    required: [true, 'Age of the author is required'],
  },
});

module.exports = mongoose.model('author', authorSchema);

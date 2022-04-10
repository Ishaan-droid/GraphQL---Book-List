const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the book book is required.'],
  },
  genre: {
    type: String,
    required: [true, 'Genre of Book is required'],
  },
  authorID: String,
});

module.exports = mongoose.model('Book', bookSchema);

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
  authorId: {
    type: String,
    required: [true, 'AuthorID is required.'],
  },
});

module.exports = mongoose.model('book', bookSchema);

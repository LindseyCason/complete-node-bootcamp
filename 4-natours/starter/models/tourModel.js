const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Tour must include a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'Tour must have a difficulty']
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Must include tour summary'],
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have an image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

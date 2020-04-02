const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'], //validator
      unique: true, //not validator technically
      trim: true,
      maxlength: ['40', 'A Tour name must be <= 40 chars'],
      minlength: ['10', 'A Tour name must be >= 10 chars']
    },
    slug: {
      type: String
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
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

tourSchema.pre('save', function(next) {
  console.log('New Item Saved');
  next();
});

//Query Middleware
tourSchema.pre(/^find/, function(next) {
  //this expression will be for all the strings that start with find.
  //find hook makes this query and not document middleware
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(docs);
  next();
  //this block isn;t necessary
});

tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});
//Document Middleware: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//aggragation middleware
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

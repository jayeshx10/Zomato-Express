const mongoose = require('mongoose');
const { User } = require('./user.model.js');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: [String],
  address: String,
  city: String,
  menu: [{
    name: String,
    price: Number,
    description: Number,
    isVeg: {
      type: String,
      enum: ['veg', 'non-veg']
    }
  }],
  reviews: [{
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewText: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = { Restaurant };
const mongoose = require("./dbConnect");

let Schema = mongoose.Schema;

const cuisineTypeSchema = new mongoose.Schema({
    cuisineType: {
      type: String,
      enum: ['indian', 'italian', 'american', 'chinese'],
    //   required: true
    },
    cuisineName: {
      type: String,
    //   required: true
    },
    description: {
      type: String,
    //   required: true
    },
    cookingDuration: {
      type: Number,
      min: 0,
      max: 1440, // Assuming the maximum duration is 24 hours (1440 minutes)
    //   required: true
    },
    noOfServing: {
      type: Number,
    //   required: true
    },
    images: {
      type: [String] // Assuming you'll store image URLs as strings
    }
  });

const Cuisine = mongoose.model('Cuisine', cuisineTypeSchema);

module.exports = Cuisine;

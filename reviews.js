// // src/models/review.js
// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//   beverageId: {
//     type: String, // ${cafeid}_${beverage} 형식의 String
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId, // 사용자 ID (ObjectId 형식)
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Review = mongoose.model('Review', reviewSchema);

// export default Review;

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  beverageId: {
    type: String, // ${cafeid}_${beverage} 형식의 String
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // 사용자 ID (ObjectId 형식)
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecommendSchema = new Schema({
  beverageId: String,
  score: Number,
  detail: [String],
});

const Recommend = mongoose.model('Recommend', RecommendSchema);
export default Recommend;
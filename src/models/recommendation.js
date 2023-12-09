import mongoose, { Schema } from 'mongoose';

const RecommendationSchema = new Schema({
    recommend: String,
    Correlation: String,
    tag: [String],
    Selected: String,
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
export default Recommendation;

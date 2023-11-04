// src/models/likecount.js
import mongoose from 'mongoose';

const likecountSchema = new mongoose.Schema({
  beverageId: {
    type: String, // ${cafeid}_${beverage} 형식의 String
    // required: true,
  },
  likedByUsers: [
    // 사용자별 좋아요 여부를 배열로 저장
    {
      username: String,
      like: Boolean,
    },
  ],
  likesCount: { type: Number, default: 0 }, // 좋아요 카운트
  dislikesCount: { type: Number, default: 0 }, // 싫어요 카운트
});

const LikeCount = mongoose.model('LikeCount', likecountSchema);

export default LikeCount;

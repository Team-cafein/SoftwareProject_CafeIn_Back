// src/models/like.js
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    username: {
      type: String, // 사용자 이름
      required: true,
    },
    likes: [{ type: String }], // 좋아요한 리뷰 ID 리스트
    dislikes: [{ type: String }], // 싫어요한 리뷰 ID 리스트
  },
  {
    versionKey: false,
  },
);

const Like = mongoose.model('Like', likeSchema);

export default Like;

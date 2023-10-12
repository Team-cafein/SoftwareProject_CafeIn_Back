// src/models/cafe.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cafeSchema = new Schema(
  {
    id: Number, // 일반 넘버 형식의 id 필드
    cafeid: Number,
    cafecount: Number,
    name: String,
    cafe: String,
    content: String,
    image: String,
    tag: [String], // tag 필드
    detail: {
      volume: { type: String, default: '' }, // 빈 문자열로 초기화
      kcal: { type: Number, default: null }, // 기본값을 null로 설정
      sat_FAT: { type: Number, default: null },
      sodium: { type: Number, default: null },
      sugars: { type: Number, default: null },
      caffeine: { type: Number, default: null },
    },
  },
  {
    collection: 'cafe', // 컬렉션 이름을 "cafe"로 명시적으로 설정
  },
);

const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;

// src/models/questions.js
import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  username: String, // 사용자 이름
  question: String, // 질문
  answer: String, // 답변
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;

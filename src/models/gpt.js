// src/models/gpt.js
import mongoose from 'mongoose';

const gptSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Gpt = mongoose.model('Gpt', gptSchema);

export default Gpt;

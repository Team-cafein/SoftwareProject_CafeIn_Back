// src/models/user.js
import mongoose, { Schema } from 'mongoose';
import bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// const UserSchema = new Schema({
//   username: String,
//   hashedPassword: String,
//   question: String, // 질문 필드 추가
//   answer: String, // 답변 필드 추가
// });

// 커스텀 메소드들을 정의
UserSchema.methods.setPassword = async function (password) {
  // 비밀번호를 암호화 하는 메소드를 정의
  const hash = await bcypt.hash(password, 10);
  this.hashedPassword = hash; // 이 값을 복사된 객체 인스턴스 UserSchema의 hashedPassword에 넣음
};

UserSchema.methods.checkPassword = async function (password) {
  // 비밀번호를 확인하는 메소드를 정의 파라미터로 받은 password와 UserSchema에 있는 비밀번호를 비교함
  const result = await bcypt.compare(password, this.hashedPassword);
  return result; // true / false
};

UserSchema.statics.findByUsername = function (username) {
  // 파라미터로 들어온 username를 UserSchema의 username이 있는지 확인 이때 정적 메소드이므로 Schema객체 그 자체가 this가 되고 Schema 객체 안의 username을 찾음
  return this.findOne({ username });
};

// 중복을 방지하기 위한 메소드를 정의
UserSchema.methods.serialize = function () {
  const data = this.toJSON(); // 인스턴스 UserSchema 객체을 JSON으로 바꾸고 그 JSON을 data에 인스턴스로 선언 후 data의 hashedPassword를 삭제
  delete data.hashedPassword;
  return data; // 제대로 200 OK이가 되었는지 확인
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // jwt 토큰 설정
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣음
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두 번쨰 파라미터에는 JWT 암호를 넣음
    {
      expiresIn: '7d', // 7일 동안 유효함
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;

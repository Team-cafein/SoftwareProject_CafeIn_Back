const mongoose = require('mongoose');

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost/product-wishlist', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductWishlist = mongoose.model('ProductWishlist', {
  userId: String,
  productId: String,
});

// 삭제할 데이터 조건 설정
const condition = { userId: "user123" };

// 데이터 삭제 (Promise 사용)
ProductWishlist.deleteMany(condition)
  .then(() => {
    console.log('데이터 삭제 완료');
  })
  .catch((err) => {
    console.error('데이터 삭제 실패:', err);
  });

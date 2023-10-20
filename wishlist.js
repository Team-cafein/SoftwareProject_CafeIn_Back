// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // MongoDB 연결 설정
// mongoose.connect('mongodb://localhost/product-wishlist', { useNewUrlParser: true, useUnifiedTopology: true });

// // 상품 찜하기 모델
// const ProductWishlist = mongoose.model('ProductWishlist', {
//   userId: String,
//   productId: String,
// });

// // JSON 파싱을 위한 미들웨어 설정
// app.use(bodyParser.json());

// // 사용자의 찜한 상품 추가
// app.post('/api/wishlist', async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     // 이미 찜한 상품인지 확인
//     const existingWishlist = await ProductWishlist.findOne({ userId, productId });

//     if (existingWishlist) {
//       res.status(409).send('이미 찜한 상품입니다.'); // 이미 찜한 상품이면 상태 코드 409 반환
//     } else {
//       const wishlist = new ProductWishlist({ userId, productId });
//       await wishlist.save();
//       res.status(201).json(wishlist); // 이미 찜한 상품이 아니면 새로운 도큐먼트를 생성하여 데이터베이스에 저장하고 상태 코드 201 반환
//     }
//   } catch (error) {
//     res.status(500).send('서버 오류');
//   }
// });

// // 사용자의 찜한 상품 목록 가져오기
// app.get('/api/wishlist/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const wishlist = await ProductWishlist.find({ userId });

//     res.json(wishlist);
//   } catch (error) {
//     res.status(500).send('서버 오류');
//   }
// });

// app.listen(port, () => {
//   console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost/product-wishlist', { useNewUrlParser: true, useUnifiedTopology: true });

// 상품 찜하기 모델
const ProductWishlist = mongoose.model('ProductWishlist', {
  userId: String,
  productId: String,
});

// JSON 파싱을 위한 미들웨어 설정
app.use(bodyParser.json());

// 사용자의 찜한 상품 추가 또는 삭제
app.post('/api/wishlist', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // 이미 찜한 상품인지 확인
    const existingWishlist = await ProductWishlist.findOne({ userId, productId });

    if (existingWishlist) {
      // 이미 찜한 상품이면 삭제
      await ProductWishlist.findByIdAndDelete(existingWishlist._id);
      res.status(200).send('찜하기가 취소되었습니다.');
    } else {
      // 찜하지 않은 상품이면 추가
      const wishlist = new ProductWishlist({ userId, productId });
      await wishlist.save();
      res.status(201).json(wishlist);
    }
  } catch (error) {
    res.status(500).send('서버 오류');
  }
});

// 사용자의 찜한 상품 목록 가져오기
app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await ProductWishlist.find({ userId });

    res.json(wishlist);
  } catch (error) {
    res.status(500).send('서버 오류');
  }
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});

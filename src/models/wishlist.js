// src/models/wishlist.js
import mongoose from 'mongoose';

const productWishlistSchema = new mongoose.Schema({
  userId: String,
  productId: String,
});

const ProductWishlist = mongoose.model(
  'ProductWishlist',
  productWishlistSchema,
);

export default ProductWishlist;

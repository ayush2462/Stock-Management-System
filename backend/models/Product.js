import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   productId: String,
  name: String,
  category: String,
  buyingPrice: Number,
  sellingPrice: Number,
  total: Number,
  sold: Number,
  available: Number,
});
export default mongoose.model("Product", productSchema);

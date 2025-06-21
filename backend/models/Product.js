import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ProductId: String,
  Name: String,
  Category: String,
  BuyingPrice: Number,
  SellingPrice: Number,
  Total: Number,
  Sold: Number,
  Available: Number,
});
export default mongoose.model("Product", productSchema);

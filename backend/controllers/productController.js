import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { total, sold, ...rest } = req.body;
  const available = total - sold;
  const newProduct = new Product({
    ...rest,
    total,
    sold,
    available,
  });
  await newProduct.save();
  res.status(201).json(newProduct);
};
export const updateProduct = async (req, res) => {
  const { total, sold, ...rest } = req.body;
  const available = total - sold;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { ...rest, total, sold, available },
    { new: true }
  );
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
};

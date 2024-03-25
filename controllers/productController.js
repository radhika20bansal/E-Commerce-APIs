const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const customError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById({ _id: productId });
  if(!product){
    throw new customError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if(!product){
    throw new customError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById({ _id: productId });
  if(!product){
    throw new customError.NotFoundError(`No product with id: ${productId}`);
  }
  await product.remove();
  
  res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully!'});
};

const uploadImage = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "upload product image" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};

const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

const createProduct = (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "Product created" });
};

const getAllProducts = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get all Product" });
};

const getSingleProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "single product" });
};

const updateProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Update product" });
};

const deleteProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "delete product" });
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

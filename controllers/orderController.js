const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get all orders" });
};

const getSingleOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get single order" });
};

const getCurrentUserOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get current user order" });
};

const createOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "create order" });
};

const updateOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update order" });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};

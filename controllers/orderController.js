const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get single order" });
};

const getCurrentUserOrders = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get current user order" });
};

const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new customError.BadRequestError("No order items provided");
  }
  if (!tax || !shippingFee) {
    throw new customError.BadRequestError("Please provide tax and shippingFee");
  }

  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const product = await Product.findById({ _id: item.product });
    if (!product) {
      throw new customError.NotFoundError(
        `No product with id: ${item.product}`
      );
    }

    const { name, price, image, _id } = product;
    const singleOrderItem = {
      product: _id,
      name,
      price: price,
      image,
      quantity: item.quantity,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += price * item.quantity;
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeAPI({ amount: total, currency: "usd" });
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const updateOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update order" });
};

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};

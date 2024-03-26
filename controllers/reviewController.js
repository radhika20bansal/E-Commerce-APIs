const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const Product = require("../models/Product");
const customError = require("../errors");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findById({ _id: productId });
  if (!isValidProduct) {
    throw new customError.NotFoundError(
      `No product found with id: ${productId}`
    );
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new customError.BadRequestError(
      "Already submitted review for this product"
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById({ _id: reviewId });
  if (!review) {
    throw new customError.NotFoundError(`No review with id ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update review" });
};

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "delete review" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};

const mongoose = require("mongoose");
const { aggregate } = require("./User");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

//to set one review per product per user
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

//To calculate product rating and num of reviews on the fly if reviews changed associated with the product
ReviewSchema.statics.calculateRatingAndReviews = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateRatingAndReviews(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateRatingAndReviews(this.product);
});
module.exports = mongoose.model("Review", ReviewSchema);

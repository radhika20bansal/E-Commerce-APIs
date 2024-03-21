const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const customError = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new customError.NotFoundError(`User not found with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: "update users" });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new customError.BadRequestError(
      "Please provide old and new passwords"
    );
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isCorrectPassword = user.comparePassword(oldPassword);
  if (!isCorrectPassword) {
    throw new customError.UnauthenticatedError("Invalid old password");
  }
  user.password = newPassword;
  await user.save();
  
  res.status(StatusCodes.OK).json({msg: 'Success ! Password updated'});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

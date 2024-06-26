const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const customError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new customError.BadRequestError("Email already exists");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.UnauthenticatedError("Invalid user credentials");
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new customError.UnauthenticatedError("Invalid user credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg: 'user logged out'});
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};

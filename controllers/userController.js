const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const customError = require('../errors');

const getAllUsers = async (req, res) => {
    console.log(req.user);
  const users = await User.find({role: 'user'}).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
    const {id: userId} = req.params;
    const user = await User.findOne({_id: userId}).select('-password');
    if(!user){
        throw new customError.NotFoundError(`User not found with id ${userId}`);
    }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: "show current user" });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: "update users" });
};

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: "update user password" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

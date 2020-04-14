const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      allUsers
    }
  });
});

exports.getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err
    });
  }
};

exports.deleteUserByID = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Successfully Deleted User',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
};

exports.updateUserByID = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    req.status(200).json({
      status: 'Successfully Updated',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    });
  }
};

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: 'succcess',
    result: user.length,
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};

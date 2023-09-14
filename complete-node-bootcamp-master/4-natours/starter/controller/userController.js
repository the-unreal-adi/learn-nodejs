const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = factory.getAllDocs(User);

exports.getSelf = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUserSelf = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'Password updation is not allowed on this URL. Use /changePasswordSelf instead',
        400,
      ),
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  if (Object.keys(filteredBody).length === 0) {
    return next(new AppError('Provide valid fields in body', 400));
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUserSelf = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = factory.getSingleDoc(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Use /api/v1/signup',
  });
};
exports.updateUser = factory.updateSingleDoc(User);

exports.deleteUser = factory.deleteSingleDoc(User);

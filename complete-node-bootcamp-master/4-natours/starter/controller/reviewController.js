const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAllDocs(Review);

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;

  const newReview = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      newReview,
    },
  });
});

exports.getReview = factory.getSingleDoc(Review);

exports.deleteReview = factory.deleteSingleDoc(Review);

exports.updateReview = factory.updateSingleDoc(Review);

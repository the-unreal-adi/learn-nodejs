const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteSingleDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No doc exist with id ${req.params.id}`, 404));
    }

    res.status(204).json({
      status: 'succcess',
      requestedAt: req.requestTime,
      data: null,
    });
  });

exports.updateSingleDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No doc exist with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'succcess',
      requestedAt: req.requestTime,
      data: {
        doc,
      },
    });
  });

exports.getSingleDoc = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No doc exist with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'succcess',
      requestedAt: req.requestTime,
      data: {
        doc,
      },
    });
  });

exports.getAllDocs = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'succcess',
      result: doc.length,
      requestedAt: req.requestTime,
      data: {
        doc,
      },
    });
  });

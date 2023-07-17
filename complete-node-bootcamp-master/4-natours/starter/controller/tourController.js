const Tour = require('../models/tourModel');

/* const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

const toursJSON = JSON.parse(fs.readFileSync(filePath));
let tour;

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  const id = val * 1;
  tour = toursJSON.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};
 */
/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing properties',
    });
  }
  next();
};
 */
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: null,
  });
};

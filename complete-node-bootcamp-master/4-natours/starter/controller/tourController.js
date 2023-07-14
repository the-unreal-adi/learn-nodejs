const fs = require('fs');

const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

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

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing properties',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    result: toursJSON.length,
    requestedAt: req.requestTime,
    data: {
      tours: toursJSON,
    },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = toursJSON[toursJSON.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  toursJSON.push(newTour);

  fs.writeFile(filePath, JSON.stringify(toursJSON), (err) => {
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: null,
  });
};

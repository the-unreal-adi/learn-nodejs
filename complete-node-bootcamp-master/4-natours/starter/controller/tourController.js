const fs = require('fs');
const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

const toursJSON = JSON.parse(fs.readFileSync(filePath));

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
  const id = req.params.id * 1;
  const tour = toursJSON.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

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
  const id = req.params.id * 1;
  const tour = toursJSON.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursJSON.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(204).json({
    status: 'succcess',
    requestedAt: req.requestTime,
    data: null,
  });
};

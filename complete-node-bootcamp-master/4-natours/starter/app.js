const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const toursJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succcess',
    result: toursJSON.length,
    data: {
      tours: toursJSON,
    },
  });
};

const getTourByID = (req, res) => {
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
    data: {
      tour,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = toursJSON[toursJSON.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  toursJSON.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursJSON),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
app.route('/api/v1/tours/:id').get(getTourByID);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening at port ${port}... `);
});

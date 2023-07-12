const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'undefined route!',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

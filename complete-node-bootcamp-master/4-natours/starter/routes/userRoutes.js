const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get('/self', userController.getSelf, userController.getUser);

router.patch('/changePasswordSelf', authController.changePasswordSelf);
router.patch('/updateUserSelf', userController.updateUserSelf);
router.delete('/deleteUserSelf', userController.deleteUserSelf);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

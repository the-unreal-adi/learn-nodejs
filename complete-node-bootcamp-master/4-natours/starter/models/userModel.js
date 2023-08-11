const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A  user must have email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User password is required'],
    minlength: [8, 'Password must have minimum 8 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Password confirmation is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password mismatch',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

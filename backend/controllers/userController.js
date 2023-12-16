const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  // Validation

  if (!name || !password || !email) {
    res.status(400);
    throw new Error('Please provide a value to all input fields');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already registered, please login');
  }

  const user = await User.create({
    name,
    password,
    email,
  });

  const token = generateToken(user._id);

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { name, _id } = user;
    res.status(201).json({
      name,
      token,
      _id,
      email,
    });
  } else {
    res.status(400).json({ msg: 'Invalid user data' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    res.status(400);
    throw new Error('Please fill in all required input fields');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not registered, please register user');
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
  }

  if (passwordIsCorrect && user) {
    const { name, email, _id } = user;
    res.status(200).json({
      name,
      email,
      _id,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

module.exports = {
  registerUser,
  loginUser,
};

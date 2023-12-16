const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/login', loginUser);

module.exports = userRouter;

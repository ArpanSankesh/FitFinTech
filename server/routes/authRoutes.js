const express = require('express');
const { login, register, changePassword, resetPassword } = require('../controllers/authController');
const userAuth = require('../middleware/userAuth');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/change-password', userAuth, changePassword);

authRouter.post('/reset-password', resetPassword);

module.exports = authRouter;
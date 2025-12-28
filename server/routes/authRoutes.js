const express = require('express');
const { login, register, changePassword } = require('../controllers/authController');
const userAuth = require('../middleware/userAuth'); // Import the security guard

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

// This route is protected by 'userAuth'
authRouter.post('/change-password', userAuth, changePassword);

module.exports = authRouter;
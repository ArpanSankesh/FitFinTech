const express = require('express');
const { subscribeNewsletter } = require('../controllers/newsletterController');
const newsletterRouter = express.Router();

newsletterRouter.post('/subscribe', subscribeNewsletter);

module.exports = newsletterRouter;
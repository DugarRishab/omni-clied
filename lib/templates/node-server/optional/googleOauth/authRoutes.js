const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.get('/google', authController.googleAuth);

module.exports = Router;
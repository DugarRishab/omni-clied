const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();

// %ROUTES% ->>
Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/logout', authController.protect, authController.logout);
// <<- %ROUTES%
module.exports = Router;
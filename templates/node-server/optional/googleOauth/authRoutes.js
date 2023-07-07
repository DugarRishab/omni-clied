const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();
// %ROUTES% ->>
Router.get('/google', authController.googleAuth);
// <<- %ROUTES%
module.exports = Router;
const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('./../controllers/authController');

const Router = express.Router();

Router.get('/', viewController.getLandingPage);

module.exports = Router;

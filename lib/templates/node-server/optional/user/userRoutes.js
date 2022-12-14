const express = require('express');
const userController = require('../controllers/userController');

const Router = express.Router();

Router.route('/all').get(userController.getAllUsers);

Router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

Router.route('/')
    .get(userController.getMe)
    .patch(userController.updateMe)
    .delete(userController.deleteMe);

module.exports = Router;

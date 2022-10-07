const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.route('/all').get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
);

Router.route('/:id')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        userController.getUser
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        userController.updateUser
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        userController.deleteUser
    );

Router.route('/')
    .get(authController.protect, userController.getMe)
    .patch(authController.protect, userController.updateMe)
	.delete(authController.protect, userController.deleteMe);
	

module.exports = Router;

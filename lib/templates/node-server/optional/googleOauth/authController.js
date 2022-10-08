/* eslint-disable new-cap */
/* eslint-disable no-lone-blocks */
/* eslint-disable arrow-body-style */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const axios = require('axios');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const oauth2Client = require('../utils/oauth2clientUtils');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
}
const createSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);

	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN),
		httpOnly: true
	}
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	user.password = undefined;

	res.cookie('jwt', token, cookieOptions);

	console.log(res);

	res.status(statusCode).json({
		message: 'success',
		token,
		data: {
			user
		}
	});
}
/* GET Google Authentication API. */
exports.googleAuth = catchAsync(async (req, res, next) => {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const googleRes = await oauth2Client.oauth2Client.getToken(code);
    
    oauth2Client.oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
	);
	
    let user = await User.findOne({ email: userRes.data.email });
   
    if (!user) {
        console.log('New User found');
        user = await User.create({
            name: userRes.data.name,
            email: userRes.data.email,
            image: userRes.data.picture,
        });
    }

    createSendToken(user, 201, res);
});
exports.signup = catchAsync(async (req, res, next) => {
	
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		role: req.body.role
	});

	createSendToken(newUser, 201, res);	
});
exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password', 401));
	}

	const user = await User.findOne({ email }).select('+password +active');

	if (!user || (!await user.correctPassword(password, user.password)) || !user.active) {
		return next(new AppError('Incorrect email or password', 401));
	}
	//console.log(req.headers);

	createSendToken(user, 200, res);
	

	
});
exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('you are not logged in', 401))
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);

	if (!currentUser) {
		return next(new AppError('The user no longer exists', 401));
	}
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(new AppError('Recently changed Password! Please login Again', 401));
	}

	console.log(log.success('!!! GRANTING ACCESS !!!'));

	res.locals.user = currentUser;
	req.user = currentUser;

	next();
});
exports.logout = (req, res, next) => {

	const cookieOptions = {
		expires: new Date(Date.now() + 2*1000),
		httpOnly: true
	}
	
	// Sending new cookie with rubbish text to replace the new cookie ->
	res.cookie('jwt', 'loggedout', cookieOptions);
	
	res.status(200).json({
		message: 'success'
	});
}
exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.roles)) {
			return next(new AppError('You do not have permision to perform this action', 401));
		}
		next();
	}
}
exports.isLoggedIn = async (req, res, next) => {	// <- We do not want to cause a Global error, so no catchAsync
	
	// 1) Getting token and checking if it's there ->
	if (req.cookies.jwt) {
		try {
			
			const token = req.cookies.jwt;
			const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
		
			const currentUser = await User.findById(decoded.id);
			//console.log(currentUser.name);
			if (!currentUser) {
				return next();
			}

			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}
		
			// There is as logged in user
			res.locals.user = currentUser;
			req.user = currentUser;
			return next();
		}
		catch (err) {
			console.log(err)
			return next();
		}
	}
	next();
	
};
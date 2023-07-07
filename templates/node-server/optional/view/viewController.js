const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getLandingPage = catchAsync(async (req, res) => {
	res
		.status(200)
		.render('landingView');
});

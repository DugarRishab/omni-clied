const axios = require('axios');
const oauth2Client = require('../utils/oauth2clientUtils');

exports.googleAuth = catchAsync(async (req, res, next) => {
    const code = req.query.code;
    console.log('USER CREDENTIAL -> ', code);

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

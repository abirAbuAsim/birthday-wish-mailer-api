const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');

const SECRET_KEY = 'birthday-wish-key';

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req);
	const tokens = await tokenService.generateAuthTokens({
		SECRET_KEY,
	});
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const tokens = await tokenService.generateAuthTokens({
		SECRET_KEY,
	});
	res.send({ tokens });
});

module.exports = {
	register,
	login,
};

const catchAsync = require('../utils/catchAsync');
const { tokenService } = require('../services');

const SECRET_KEY = 'birthday-wish-key';

const generateApiToken = catchAsync(async (req, res) => {
	const tokens = await tokenService.generateAuthTokens({
		SECRET_KEY,
	});
	res.send({ tokens });
});

module.exports = {
	generateApiToken,
};

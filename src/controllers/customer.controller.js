const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { customerService } = require('../services');
const logger = require('../config/logger');

const getCustomers = catchAsync(async (req, res) => {
	logger.info(JSON.stringify(req.body));
	const customers = await customerService.getCustomers(req);
	res.send({ customers });
});

const getCustomer = catchAsync(async (req, res) => {
	const customer = await customerService.getUserById(req.params.userId);

	if (!customer) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}

	res.send({ customer });
});

const createCustomer = catchAsync(async (req, res) => {
	const customer = await customerService.createCustomer(req);

	if (!customer) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Customer not created');
	}

	res.status(httpStatus.CREATED).send({ customer });
});

module.exports = {
	getCustomers,
	getCustomer,
	createCustomer,
};

const Joi = require('@hapi/joi');

const createCustomer = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		name: Joi.string().required(),
		birthday: Joi.string().required(),
	}),
};

const getCustomers = {
	query: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string().email(),
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getCustomer = {
	params: Joi.object().keys({
		userId: Joi.string(),
	}),
};

module.exports = {
	getCustomers,
	getCustomer,
	createCustomer,
};

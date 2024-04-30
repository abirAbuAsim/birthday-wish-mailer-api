const Joi = require('@hapi/joi');

const createCustomer = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		name: Joi.string().required(),
		birthday: Joi.string().required(),
	}),
};

module.exports = {
	createCustomer,
};

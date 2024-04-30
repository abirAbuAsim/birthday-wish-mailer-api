const httpStatus = require('http-status');
const { Sequelize } = require('sequelize');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const logger = require('../config/logger');

async function getCustomerByEmail(email) {
	const customer = await db.customer.findOne({
		where: { email },
		raw: true,
	});

	return customer;
}

async function getCustomersByBirthday(birthday) {
	// Assuming birthday is passed in YYYY-MM-DD format
	logger.info(`Looking up users with birthday on: ${birthday}`);

	const customers = await db.customer.findAndCountAll({
		where: {
			// Use Sequelize.literal to format the birthday timestamp to date only for comparison
			birthday: Sequelize.literal(`date(birthday) = '${birthday}'`),
		},
		attributes: [
			'id',
			'name',
			'email',
			'created_date_time',
			'modified_date_time',
			'birthday',
		],
		raw: true,
	});

	return customers;
}

async function getCustomerById(id) {
	const user = await db.user.findOne({
		where: { id },
		raw: true,
	});

	return user;
}

async function createCustomer(req) {
	const { email, name, birthday } = req.body;
	logger.info(`Create Customer Request Body: ${JSON.stringify(req.body)}`);
	const customer = await getCustomerByEmail(email);

	if (customer) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const createdCustomer = await db.customer
		.create({
			name,
			email,
			birthday,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCustomer;
}

async function getCustomers(req) {
	const { page, limit } = config.pagination;

	const offset = getOffset(page, limit);

	const customers = await db.customer.findAndCountAll({
		order: [
			['name', 'ASC'],
			['created_date_time', 'DESC'],
			['modified_date_time', 'DESC'],
		],
		attributes: [
			'id',
			'name',
			'email',
			'created_date_time',
			'modified_date_time',
			'birthday',
		],
		offset,
		limit,
		raw: true,
	});

	return customers;
}

module.exports = {
	getCustomerByEmail,
	getCustomerById,
	getCustomersByBirthday,
	createCustomer,
	getCustomers,
};

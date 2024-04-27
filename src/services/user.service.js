const httpStatus = require('http-status');
const { Sequelize } = require('sequelize');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const { encryptData } = require('../utils/auth');
const config = require('../config/config');
const db = require('../db/models');
const logger = require('../config/logger');

async function getUserByEmail(email) {
	const user = await db.user.findOne({
		where: { email },
		raw: true,
	});

	return user;
}

async function getUserByBirthday(birthday) {
	// Assuming birthday is passed in YYYY-MM-DD format
	logger.info(`Looking up users with birthday on: ${birthday}`);

	const user = await db.user.findOne({
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

	return user;
}

async function getUserById(id) {
	const user = await db.user.findOne({
		where: { id },
		raw: true,
	});

	return user;
}

async function createUser(req) {
	const { email, name, password } = req.body;
	const hashedPassword = await encryptData(password);
	const user = await getUserByEmail(email);

	if (user) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const createdUser = await db.user
		.create({
			name,
			email,
			password: hashedPassword,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdUser;
}

async function getUsers(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const {
		page = defaultPage,
		limit = defaultLimit,
		name,
		email,
		birthday,
	} = req.query;

	const offset = getOffset(page, limit);

	// Constructing the where clause based on provided parameters
	const where = {};
	if (name) where.name = { [db.Sequelize.Op.like]: `%${name}%` }; // allows partial match
	if (email) where.email = email;
	if (birthday) where.birthday = birthday;

	logger.info();

	const users = await db.user.findAndCountAll({
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
		where,
		offset,
		limit,
		raw: true,
	});

	return users;
}

module.exports = {
	getUserByEmail,
	getUserById,
	getUserByBirthday,
	createUser,
	getUsers,
};

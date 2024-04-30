// eslint-disable-next-line import/no-extraneous-dependencies
const { Queue } = require('bullmq');
const logger = require('../config/logger');
const { queueName, connection } = require('../config/config');
const { customerService } = require('../services');

const queue = new Queue(queueName, { connection });

async function getCustomersWithBirthdayToday() {
	const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
	logger.info(JSON.stringify(today));

	const result = await customerService.getCustomersByBirthday(today);

	if (result.count === 0) {
		logger.info("No customers found with today's birthday");
		return [];
	}
	return result.rows;
}

async function scheduleBirthdayEmails() {
	const customers = await getCustomersWithBirthdayToday();

	// cron job will execute at 12:30 AM every day.
	await queue.add(queueName, customers, { repeat: { cron: '30 0 * * *' } });
}

module.exports = {
	scheduleBirthdayEmails,
};

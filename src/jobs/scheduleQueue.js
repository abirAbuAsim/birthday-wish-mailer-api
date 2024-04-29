// eslint-disable-next-line import/no-extraneous-dependencies
const { Queue } = require('bullmq');
const logger = require('../config/logger');
const { queueName, connection } = require('../config/config');

const queue = new Queue(queueName, { connection });

async function scheduleBirthdayEmails() {
	logger.info('INSIDE scheduleBirthdayEmails: ');
	await queue.add(
		queueName,
		{
			from: '######office3@gmail.com',
			to: '######customer3@gmail.com',
			subject: '######Happy Birthday!',
			text: `######Happy Birthday, Customer3! Have a great day!`,
		},
		{ repeat: { cron: '* * * * *' } }
	);
}

// async function addBirthdayEmailJobs() {
// 	const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
// 	logger.info(`INSIDE addBirthdayEmailJobs: ${JSON.stringify(today)}`);
// 	const customers = await customerService.getCustomersByBirthday(today);
// 	logger.info(`INSIDE addBirthdayEmailJobs: ${customers}`);
// 	logger.info(JSON.stringify(customers));
// 	customers.forEach((customer) => {
// 		emailQueue.add(
// 			'sendBirthdayEmail',
// 			{ customer },
// 			{ attempts: 3, backoff: 20000 }
// 		);
// 	});
// }

module.exports = {
	scheduleBirthdayEmails,
};

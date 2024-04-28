const cron = require('node-cron');
const logger = require('../config/logger');
const { customerService, emailService } = require('../services');

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

async function sendBirthdayWishes() {
	const customers = await getCustomersWithBirthdayToday();

	logger.info('Cron job started: Sending birthday wishes...');
	logger.info(JSON.stringify(customers));

	const sendEmailPromises = customers.map((customer) => {
		const mailOptions = {
			from: 'your-email@gmail.com',
			to: customer.email,
			subject: 'Happy Birthday!',
			text: `Happy Birthday, ${customer.name}! Have a great day!`,
		};

		return emailService
			.sendEmail(mailOptions)
			.then(() =>
				logger.info(
					`Birthday wish sent to ${customer.name} (${customer.email}).`
				)
			)
			.catch((err) =>
				logger.error(
					`Failed to send birthday wish to ${customer.name} (${customer.email}): ${err}`
				)
			);
	});

	await Promise.all(sendEmailPromises);

	logger.info('Cron job finished: Birthday wishes sent.');
}

function scheduleBirthdayEmails() {
	// Cron to run every Minute to test
	// TODO: Update cron to run every 24 Hours
	cron.schedule('* * * * *', sendBirthdayWishes, {
		scheduled: true,
		timezone: 'Asia/Dhaka',
	});
}

module.exports = {
	scheduleBirthdayEmails,
	getCustomersWithBirthdayToday,
};

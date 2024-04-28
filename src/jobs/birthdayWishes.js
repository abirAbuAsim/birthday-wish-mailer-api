const cron = require('node-cron');
const logger = require('../config/logger');
const { customerService, emailService } = require('../services');

async function getCustomersWithBirthdayToday() {
	const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
	logger.info(JSON.stringify(today));

	const customersWithBirthdays = await customerService.getCustomerByBirthday(
		today
	);
	return customersWithBirthdays;
}

async function sendBirthdayWishes() {
	const user = await getCustomersWithBirthdayToday();

	logger.info('Cron job started: Sending birthday wishes...');
	logger.info(JSON.stringify(user));
	const mailOptions = {
		from: 'your-email@gmail.com',
		to: user.email,
		subject: 'Happy Birthday!',
		text: `Happy Birthday, ${user.name}! Have a great day!`,
	};

	await emailService.sendEmail(mailOptions);
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

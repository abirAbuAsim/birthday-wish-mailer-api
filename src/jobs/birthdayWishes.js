const cron = require('node-cron');
const logger = require('../config/logger');
const { userService, emailService } = require('../services');
const { sendMail } = require('../utils/mailer');

// ... rest of your code to set up email sending ...

async function getUsersWithBirthdayToday() {
	// Example: Fetching from a database where 'birthday' is stored in 'YYYY-MM-DD' format
	const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
	logger.info(JSON.stringify(today));

	const usersWithBirthdays = await userService.getUserByBirthday(today);
	return usersWithBirthdays;
}

// Function to send birthday wishes
async function sendBirthdayWishes() {
	const user = await getUsersWithBirthdayToday();

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
	cron.schedule('* * * * *', sendBirthdayWishes, {
		scheduled: true,
		timezone: 'Asia/Dhaka',
	});
}

module.exports = {
	scheduleBirthdayEmails,
	getUsersWithBirthdayToday,
};

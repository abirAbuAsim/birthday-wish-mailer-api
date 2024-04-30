const { emailService } = require('../services');
const logger = require('../config/logger');

module.exports = async (job) => {
	try {
		if (!job.data || job.data.length === 0) {
			logger.info('No customers to process.');
			return [];
		}

		const customers = job.data;

		const emailPromises = customers.map(async (customer) => {
			try {
				const mailOptions = {
					from: 'your-email@gmail.com',
					to: customer.email,
					subject: 'Happy Birthday!',
					text: `Happy Birthday, ${customer.name}! Have a great day!`,
				};
				const emailReport = await emailService.sendEmail(mailOptions);
				logger.info(`Email sent successfully to ${customer.email}`);
				return emailReport;
			} catch (error) {
				logger.error(
					`Failed to send email to ${customer.email}: ${error}`
				);
				// Return an error object to avoid rejecting Promise.all
				return { error: true, message: error.message };
			}
		});

		const emailReports = await Promise.all(emailPromises);
		return emailReports;
	} catch (e) {
		logger.error(`Failed to send birthday wish to Customer : ${e}`);
	}
};

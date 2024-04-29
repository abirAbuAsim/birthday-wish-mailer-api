const { emailService } = require('../services');
const logger = require('../config/logger');

module.exports = async (job) => {
	try {
		const customer = job.data;
		// logger.info(`INSIDE BullMQ Worker: ${JSON.stringify(job.data)}`);

		const emailReport = emailService.sendEmail(customer);

		return emailReport;
	} catch (e) {
		logger.error(`Failed to send birthday wish to Customer : ${e}`);
	}
};

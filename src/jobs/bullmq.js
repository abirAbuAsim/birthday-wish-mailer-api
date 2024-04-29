// // eslint-disable-next-line import/no-extraneous-dependencies
// const { Queue, Worker } = require('bullmq');
// const { customerService, emailService } = require('../services');
// const logger = require('../config/logger');

// const connection = {
// 	host: '127.0.0.1',
// 	port: 6379,
// };

// const emailQueue = new Queue('birthdayQueue', { connection });

// // async function addBirthdayEmailJobs() {
// // 	const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
// // 	logger.info(`INSIDE addBirthdayEmailJobs: ${JSON.stringify(today)}`);
// // 	const customers = await customerService.getCustomersByBirthday(today);
// // 	logger.info(`INSIDE addBirthdayEmailJobs: ${customers}`);
// // 	logger.info(JSON.stringify(customers));
// // 	customers.forEach((customer) => {
// // 		emailQueue.add(
// // 			'sendBirthdayEmail',
// // 			{ customer },
// // 			{ attempts: 3, backoff: 20000 }
// // 		);
// // 	});
// // }

// const worker = new Worker(
// 	'birthdayQueue',
// 	async (job) => {
// 		const customer = job.data;
// 		// logger.info(`INSIDE BullMQ Worker: ${JSON.stringify(job.data)}`);
// 		return emailService
// 			.sendEmail(customer)
// 			.then(() => logger.info(`Birthday wish sent to Customer.`))
// 			.catch((err) =>
// 				logger.error(
// 					`Failed to send birthday wish to Customer : ${err}`
// 				)
// 			);
// 		// return emailService.sendEmail(customer);
// 	},
// 	{ connection }
// );

// async function scheduleBirthdayEmails() {
// 	logger.info('INSIDE scheduleBirthdayEmails: ');
// 	await emailQueue.add(
// 		'scheduleBirthdayEmails',
// 		{
// 			from: 'office2@gmail.com',
// 			to: 'customer2@gmail.com',
// 			subject: 'Happy Birthday!',
// 			text: `Happy Birthday, Customer2! Have a great day!`,
// 		},
// 		{ repeat: { cron: '* * * * *' } }
// 	);
// }

// module.exports = {
// 	// addBirthdayEmailJobs,
// 	scheduleBirthdayEmails,
// };

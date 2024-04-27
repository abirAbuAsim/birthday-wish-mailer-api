const nodemailer = require('nodemailer');
const {
	createTransport,
	createTestAccount,
	getTestMessageUrl,
} = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

const {
	NODE_ENV,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
	DEFAULT_MAIL_SENDER,
} = process.env;

if (config.env !== 'test') {
	transport
		.verify()
		.then(() => logger.info('Connected to email server'))
		.catch(() =>
			logger.warn(
				'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
			)
		);
}

async function getTransporter() {
	let transporter;
	if (NODE_ENV !== 'production') {
		const testAccount = await createTestAccount();
		transporter = createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});
	} else {
		transporter = createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: Number(SMTP_PORT) === 465,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD,
			},
		});
	}
	return transporter;
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (mailOptions) => {
	// const msg = { from: config.email.from, to, subject, text };
	// await transport.sendMail(msg);

	// If there is no sender in payload, set default sender
	const payload = mailOptions;
	if (!payload.from) {
		payload.from = DEFAULT_MAIL_SENDER;
	}

	// Create transporter
	const transporter = await getTransporter();

	// Send mail
	const mailInfo = await transporter.sendMail(payload);

	// If in development mode, console.log the preview url.
	if (NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		logger.info(`Mail Preview URL is ${getTestMessageUrl(mailInfo)}`);
	}

	// Return mail response
	return mailInfo;
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
	const subject = 'Reset password';
	// replace this url with the link to the reset password page of your front-end app
	const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
	const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email. Your token will be expired in 24 hours.`;
	await sendEmail(to, subject, text);
};

module.exports = {
	transport,
	sendEmail,
	sendResetPasswordEmail,
};

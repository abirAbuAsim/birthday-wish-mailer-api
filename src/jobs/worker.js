// eslint-disable-next-line import/no-extraneous-dependencies
const { Worker } = require('bullmq');
const {
	queueName,
	connection,
	concurrency,
	limiter,
} = require('../config/config');
const logger = require('../config/logger');

const worker = new Worker(queueName, `${__dirname}/processor.js`, {
	connection,
	concurrency,
	limiter,
});

logger.info('Worker listening for jobs');

module.exports = {
	worker,
};

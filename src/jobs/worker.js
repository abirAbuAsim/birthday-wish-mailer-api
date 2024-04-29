// eslint-disable-next-line import/no-extraneous-dependencies
const { Worker } = require('bullmq');
const { connection, concurrency } = require('../config/config');
const logger = require('../config/logger');
const config = require('../config/config');

const worker = new Worker(config.queueName, `${__dirname}/processor.js`, {
	connection,
	concurrency,
});

logger.info('Worker listening for jobs');

module.exports = {
	worker,
};

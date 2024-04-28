const express = require('express');
const authRoute = require('./auth.route');
const customerRoute = require('./customer.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customer', customerRoute);

module.exports = router;

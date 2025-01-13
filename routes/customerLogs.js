const express = require('express');
const router = express.Router();
const CustomerLogsController = require('../controllers/customerLogsController');
const { validateObjectId, validateDateRange } = require('../middleware/validators');

router.post('/opiniionTest', [
  validateObjectId,
  validateDateRange
], CustomerLogsController.getCustomerLogs);

module.exports = router;
const express = require('express');
const { getDashboardData } = require('../controller/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, getDashboardData);

module.exports = router;
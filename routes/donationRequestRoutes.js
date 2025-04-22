const express = require('express');
const { createDonationRequest, getAllDonationRequests } = require('../controllers/donationRequestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('ngo'), createDonationRequest);

router.get('/', authMiddleware, getAllDonationRequests);

module.exports = router;

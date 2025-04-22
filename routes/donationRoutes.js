const express = require('express');
const { createDonation, getAllDonations, claimDonation } = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createDonation);

router.get('/', authMiddleware, getAllDonations);

router.post('/claim', authMiddleware, claimDonation);

module.exports = router;

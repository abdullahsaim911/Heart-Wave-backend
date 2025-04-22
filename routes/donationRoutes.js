const express = require('express');
const { createDonation, getAllDonations, claimDonation } = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/donations - Donors post a new donation
router.post('/', authMiddleware, createDonation);

// GET /api/donations - Get all available donations
router.get('/', authMiddleware, getAllDonations);

// POST /api/donations/claim - Claim a donation (NGO or Volunteer)
router.post('/claim', authMiddleware, claimDonation);

module.exports = router;

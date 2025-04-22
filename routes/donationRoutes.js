const express = require('express');
const { createDonation, getAllDonations, claimDonation } = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createDonation); //POST /api/donations

router.get('/', authMiddleware, getAllDonations); // GET /api/donations



router.post('/claim', authMiddleware, claimDonation); //POST /api/donations/claim



module.exports = router;

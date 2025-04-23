const express = require('express');

const { getDonationClaimsByNgo ,createDonation, 
getUnclaimedDonationsByDonor ,getAllDonations,
getDonationById , claimDonation 
,getDonorClaimedDonations,getDonationRequestsByDonor  } = require('../controllers/donationController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createDonation); //POST /api/donations

router.get('/', authMiddleware, getAllDonations); // GET /api/donations

router.get('/claims', authMiddleware, roleMiddleware('ngo'), getDonationClaimsByNgo);  // GET /api/donations/claims

router.post('/claim', authMiddleware, claimDonation); //POST /api/donations/claim

// GET /api/donations/unclaimed-by-me
router.get('/unclaimed-by-me', authMiddleware, getUnclaimedDonationsByDonor);

router.get('/:donationId', authMiddleware,roleMiddleware('donor ') ,getDonationById); // GET /api/donations/:donationId

// GET /api/donations/claimed-by-donor - List all claimed donations made by the donor
router.get('/claimed-by-donor', authMiddleware, getDonorClaimedDonations);

// GET /api/donation-requests/donated - List all donation requests made by NGOs that the logged-in donor has donated to
router.get('/donated', authMiddleware, getDonationRequestsByDonor);





module.exports = router;

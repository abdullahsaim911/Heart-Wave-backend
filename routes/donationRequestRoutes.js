const express = require('express');
const { createDonationRequest, getAllDonationRequests,getMyDonationRequests ,getMyDonationRequestById } = require('../controllers/donationRequestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('ngo'), createDonationRequest);

router.get('/', authMiddleware, getAllDonationRequests);


router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyDonationRequests);

//GET /api/donation-requests/my/:requestId
router.get('/my/:requestId', authMiddleware, roleMiddleware('ngo'), getMyDonationRequestById); 




module.exports = router;

const express = require('express');
const { createDonationRequest, getAllDonationRequests,getMyDonationRequests } = require('../controllers/donationRequestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('ngo'), createDonationRequest);

router.get('/', authMiddleware, getAllDonationRequests);

router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyDonationRequests);


module.exports = router;

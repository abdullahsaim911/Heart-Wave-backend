const express = require('express');
const {deleteDonationRequest ,updateDonationRequest ,getDonationRequestById , createDonationRequest, getAllDonationRequests,getMyDonationRequests ,getMyDonationRequestById } = require('../controllers/donationRequestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

//POST /api/donation-requests
router.post('/', authMiddleware, roleMiddleware('ngo'), createDonationRequest);

//GET /api/donation-requests
router.get('/', authMiddleware, getAllDonationRequests);

//GET /api/donation-requests/mine
router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyDonationRequests);

//GET /api/donation-requests/my/:requestId
router.get('/my/:requestId', authMiddleware, roleMiddleware('ngo'), getMyDonationRequestById); 


//PUT /api/donation-requests/update/:requestId
router.put('/update/:requestId', authMiddleware, roleMiddleware('ngo'), updateDonationRequest); 

// GET /api/donation-requests/:requestId
router.get('/:requestId', authMiddleware, getDonationRequestById); 


//DELETE /api/donation-requests/:requestId
router.delete('/:requestId', authMiddleware, roleMiddleware('ngo'), deleteDonationRequest);




module.exports = router;

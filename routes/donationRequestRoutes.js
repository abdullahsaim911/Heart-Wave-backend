const express = require('express');

const {getCompletedDonationRequestsByNgo,getInterestedUsers ,
getAllDonationRequestsByNGOs,getAcceptedDonations,getPendingDonationRequestById ,
acceptDonation ,deleteDonationRequest ,updateDonationRequest ,
getDonationRequestById , createDonationRequest, getAllDonationRequests,
getMyDonationRequests ,getMyDonationRequestById,
applyForDonationRequest  } = require('../controllers/donationRequestController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/donation-requests/all-ngos 
// Public or Authenticated Access
router.get('/all-ngos', authMiddleware, getAllDonationRequestsByNGOs);

//GET	/api/donation-requests/view/:requestId
router.get('/view/:requestId', authMiddleware, getPendingDonationRequestById);


// GET /api/donation-requests/interested/:requestId
router.get('/interested/:requestId', authMiddleware, getInterestedUsers);  

// GET /api/donation-requests/completed
router.get('/completed', authMiddleware, roleMiddleware('ngo'), getCompletedDonationRequestsByNgo);  

//POST /api/donation-requests
router.post('/', authMiddleware, roleMiddleware('ngo'), createDonationRequest);

//GET /api/donation-requests
router.get('/', authMiddleware, getAllDonationRequests);

//GET /api/donation-requests/mine
router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyDonationRequests);

//GET /api/donation-requests/my/:requestId
router.get('/my/:requestId', authMiddleware, roleMiddleware('ngo'), getMyDonationRequestById); 

// POST /api/donation-requests/accept
router.post('/accept', authMiddleware, roleMiddleware('ngo'), acceptDonation);  


//PUT /api/donation-requests/update/:requestId
router.put('/update/:requestId', authMiddleware, roleMiddleware('ngo'), updateDonationRequest); 

// GET /api/donation-requests/:requestId
router.get('/:requestId', authMiddleware, getDonationRequestById); 


//DELETE /api/donation-requests/:requestId
router.delete('/:requestId', authMiddleware, roleMiddleware('ngo'), deleteDonationRequest);

 // GET /api/donation-requests/accepted/:requestId
router.get('/accepted/:requestId', authMiddleware, roleMiddleware('ngo'), getAcceptedDonations); 

// POST /api/donation-requests/:requestId/apply - Donor applies for donation request
router.post('/:requestId/apply', authMiddleware, applyForDonationRequest);






module.exports = router;

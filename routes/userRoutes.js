const express = require('express');
const { updateLocation } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/location', authMiddleware, updateLocation); 

module.exports = router;

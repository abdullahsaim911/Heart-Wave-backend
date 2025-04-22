

// POST /api/donations - Create a new donation (only donors can post)
const Donation = require('../models/donationModel');

// POST /api/donations - Donors post a new donation
exports.createDonation = async (req, res) => {
  const { type, description, location, urgency } = req.body;

  // Check if the user is a donor
  if (req.user.role !== 'donor') {
    return res.status(403).json({ message: 'Only donors can post donations' });
  }

  try {
    const donation = new Donation({
      type,
      description,
      location,
      urgency,
      donor: req.user.userId,  // Attach the donor's userId
    });

    await donation.save();
    res.status(201).json({ message: 'Donation posted successfully', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting donation' });
  }
};

// GET /api/donations - Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();  // Fetch all donations
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};

// POST /api/donations/claim - Claim a donation (NGOs or Volunteers)
// POST /api/donations/claim - Claim a donation (NGOs only)
exports.claimDonation = async (req, res) => {
    const { donationId } = req.body;
  
    try {
      const donation = await Donation.findById(donationId);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      // Ensure the user is an NGO
      if (req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'Only NGOs can claim donations' });
      }
  
      // Check if the donation is already claimed
      if (donation.claimedBy) {
        return res.status(400).json({ message: 'Donation already claimed' });
      }
  
      // Update the donation's claimedBy field
      donation.claimedBy = req.user.userId;  // Attach the NGO's userId
      await donation.save();
  
      res.status(200).json({ message: 'Donation claimed successfully', donation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error claiming donation' });
    }
  };
  


const Donation = require('../models/donationModel');

exports.createDonation = async (req, res) => {
  const { type, description, location, urgency } = req.body;

  if (req.user.role !== 'donor') {
    return res.status(403).json({ message: 'Only donors can post donations' });
  }

  try {
    const donation = new Donation({
      type,
      description,
      location,
      urgency,
      donor: req.user.userId, 
    });

    await donation.save();
    res.status(201).json({ message: 'Donation posted successfully', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting donation' });
  }
};


exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();  
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};



exports.claimDonation = async (req, res) => {
    const { donationId } = req.body;
  
    try {
      const donation = await Donation.findById(donationId);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      
      if (req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'Only NGOs can claim donations' });
      }
  
      
      if (donation.claimedBy) {
        return res.status(400).json({ message: 'Donation already claimed' });
      }
  
      
      donation.claimedBy = req.user.userId;  
      await donation.save();
  
      res.status(200).json({ message: 'Donation claimed successfully', donation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error claiming donation' });
    }
  };
  
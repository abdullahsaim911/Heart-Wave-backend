

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

  exports.getDonationClaimsByNgo = async (req, res) => {
    try {
      const donationClaims = await Donation.find({ claimedBy: req.user.userId });
      res.status(200).json({ donationClaims });
    } catch (error) {
      console.error("Error fetching donation claims:", error);
      res.status(500).json({ message: 'Error fetching donation claims' });
    }
  };


  exports.getUnclaimedDonationsByDonor = async (req, res) => {
    try {
      const donorId = req.user.userId;
  
      const unclaimedDonations = await Donation.find({
        donor: donorId,
        claimedBy: { $exists: false } 
      });
  
      if (!unclaimedDonations || unclaimedDonations.length === 0) {
        return res.status(404).json({ message: 'No unclaimed donations found' });
      }
  
      res.status(200).json({ donations: unclaimedDonations });
    } catch (error) {
      console.error("Error fetching unclaimed donations:", error);
      res.status(500).json({ message: 'Error fetching unclaimed donations' });
    }
  };


  exports.getDonationById = async (req, res) => {
    const { donationId } = req.params;
  
    try {
      const donation = await Donation.findById(donationId)
        .populate('donor', 'name email')  
        .populate('claimedBy', 'name email'); 
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      res.status(200).json(donation);
    } catch (error) {
      console.error('Error fetching donation:', error);
      res.status(500).json({ message: 'Error fetching donation' });
    }
  };


  exports.getDonorClaimedDonations = async (req, res) => {
    const donorId = req.user.userId;  
    try {
      
      const claimedDonations = await Donation.find({
        donor: donorId,
        claimedBy: { $ne: null }  
      }).populate('claimedBy', 'name email')  
        .populate('donor', 'name email');  
      if (!claimedDonations || claimedDonations.length === 0) {
        return res.status(404).json({ message: 'No claimed donations found for this donor' });
      }
  
      res.status(200).json(claimedDonations);
    } catch (error) {
      console.error("Error fetching claimed donations:", error);
      res.status(500).json({ message: 'Error fetching claimed donations' });
    }
  };

  exports.getDonationRequestsByDonor = async (req, res) => {
    const donorId = req.user.userId;  
    try {
      
      const donationRequests = await DonationRequest.find({
        acceptedDonations: donorId  
      }).populate('requestedBy', 'name email')  
        .populate('acceptedDonations', 'name email'); 
  
      if (!donationRequests || donationRequests.length === 0) {
        return res.status(404).json({ message: 'No donation requests found for this donor' });
      }
  
      res.status(200).json(donationRequests);
    } catch (error) {
      console.error("Error fetching donation requests by donor:", error);
      res.status(500).json({ message: 'Error fetching donation requests' });
    }
  };
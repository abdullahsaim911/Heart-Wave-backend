const DonationRequest = require('../models/donationRequestModel');

exports.createDonationRequest = async (req, res) => {
    const { title, type, description, location, urgency, address } = req.body;

    try {
        const request = new DonationRequest({
            title,
            type,
            description,
            address,
            location,
            urgency,
            requestedBy: req.user.userId
        });

        await request.save();
        res.status(201).json({ message: 'Donation request posted successfully', request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating donation request' });
    }
};

exports.getAllDonationRequests = async (req, res) => {
    try {
        const requests = await DonationRequest.find().populate('requestedBy', 'name email');
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching donation requests' });
    }
};


exports.updateDonationRequest = async (req, res) => {
  const { requestId } = req.params;  
  const { title, type, description, location, urgency } = req.body;

  try {
    const donationRequest = await DonationRequest.findById(requestId);
    
    if (!donationRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    if (donationRequest.requestedBy.toString() !== req.user.userId && req.user.role !== 'ngo') {
      return res.status(403).json({ message: 'You are not authorized to update this donation request' });
    }

    donationRequest.title = title || donationRequest.title;
    donationRequest.type = type || donationRequest.type;
    donationRequest.description = description || donationRequest.description;
    donationRequest.location = location || donationRequest.location;
    donationRequest.urgency = urgency || donationRequest.urgency;

    await donationRequest.save();
    res.status(200).json({ message: 'Donation request updated successfully', donationRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating donation request' });
  }
};

exports.deleteDonationRequest = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const donationRequest = await DonationRequest.findById(requestId);
      if (!donationRequest) {
        return res.status(404).json({ message: 'Donation request not found' });
      }
  
      if (!req.user || !req.user.userId || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized: Missing user details' });
      }
  
      if (donationRequest.requestedBy.toString() !== req.user.userId.toString() && req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'You are not authorized to delete this donation request' });
      }
  
      await DonationRequest.deleteOne({ _id: requestId });
  
      res.status(200).json({ message: 'Donation request deleted successfully' });
    } catch (error) {
      console.error('Error deleting donation request:', error);
      res.status(500).json({ message: 'Error deleting donation request' });
    }
  };



exports.getDonationRequestById = async (req, res) => {
    const { requestId } = req.params;

    try {
        
        const donationRequest = await DonationRequest.findById(requestId).populate('requestedBy', 'name email');

        if (!donationRequest) {
            return res.status(404).json({ message: 'Donation request not found' });
        }

        res.status(200).json(donationRequest);
    } catch (error) {
        console.error('Error fetching donation request:', error);
        res.status(500).json({ message: 'Error fetching donation request' });
    }
};



exports.getMyDonationRequests = async (req, res) => {
    try {
        const requests = await DonationRequest.find({ requestedBy: req.user.userId }).populate('requestedBy', 'name email');
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching your donation requests' });
    }
};

exports.getMyDonationRequestById = async (req, res) => {
    const { requestId } = req.params;

    try {
        const request = await DonationRequest.findOne({
            _id: requestId,
            requestedBy: req.user.userId
        }).populate('requestedBy', 'name email');

        if (!request) {
            return res.status(403).json({ message: 'You are not authorized to view this request' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error('Error fetching request:', error);
        res.status(500).json({ message: 'Error fetching donation request' });
    }
};



const DonationRequest = require('../models/donationRequestModel');

exports.createDonationRequest = async (req, res) => {
  const { title,type, description, location, urgency,address } = req.body;

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
  
  

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

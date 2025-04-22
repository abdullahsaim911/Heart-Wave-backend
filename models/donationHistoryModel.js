const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },  
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  donationDate: { type: Date, default: Date.now },  
}, { timestamps: true });

const DonationHistory = mongoose.model('DonationHistory', donationHistorySchema);
module.exports = DonationHistory;

// models/donationHistoryModel.js
const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },  // Reference to Donation
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the Donor
  donationDate: { type: Date, default: Date.now },  // Date of donation
}, { timestamps: true });

const DonationHistory = mongoose.model('DonationHistory', donationHistorySchema);
module.exports = DonationHistory;

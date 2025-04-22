// models/donationModel.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true },  // e.g., food, clothes, money
  description: { type: String, default: '' },
  location: {
    type: { lat: Number, lng: Number },
    required: true,
  },
  urgency: { type: String, enum: ['medium', 'high','low'], default: 'low' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the Donor
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the NGO or individual claiming the donation
}, { timestamps: true });


donationSchema.index({ location: '2dsphere' });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;



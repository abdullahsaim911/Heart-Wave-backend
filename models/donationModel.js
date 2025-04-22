const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true },  
  description: { type: String, default: '' },
  location: {
    type: { lat: Number, lng: Number },
    required: true,
  },
  urgency: { type: String, enum: ['medium', 'high','low'], default: 'low' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  

  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
}, { timestamps: true });


donationSchema.index({ location: '2dsphere' });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;



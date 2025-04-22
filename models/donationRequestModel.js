const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: { type: [Number], required: true }
    },
    urgency: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

donationRequestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('DonationRequest', donationRequestSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },  
    coordinates: { type: [Number], required: true },  
  },
  skillsRequired: { type: [String], required: true },
  urgency: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });



taskSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Task', taskSchema);

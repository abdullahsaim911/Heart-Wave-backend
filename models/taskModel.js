
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  availability: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: false
    }
  },
  skillsRequired: { type: [String], required: true },
  urgency: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  
  completed: { type: Boolean, default: false },  

  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });



taskSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'donor', 'ngo'], required: true },
  skills: { type: [String], default: [] },
  resources: { type: [String], default: [] },
  organization: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true
    }
  },
  availability: { type: [String], default: [] },
  profileImage: { type: String, default: '' },
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;

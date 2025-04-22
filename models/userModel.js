
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'donor', 'ngo'], required: true },
  skills: { type: [String], default: [] },
  resources: { type: [String], default: [] },
  organization: { type: String, default: '' },
  location: {
    type: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false }
    },
    default: { lat: 0, lng: 0 }  
  },
  availability: { type: [String], default: [] },
  profileImage: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

const User = require('../models/userModel');

exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.location = {
      type: 'Point',
      coordinates: [lng, lat]  // Note: GeoJSON uses [lng, lat]
    };

    await user.save();
    res.status(200).json({ message: "Location updated successfully" });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSkills = (req, res) => {
    const skills = [
      "First Aid",
      "Construction",
      "Food Handling",
      "Medical Assistance",
      "Logistics",
      "Child Care",
      "Teaching",
      "Counseling",
      "Packaging",
      "Rescue",
      "Cooking",
      "Driving"
    ];
  
    res.status(200).json(skills);
  };
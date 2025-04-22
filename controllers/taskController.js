const Task = require('../models/taskModel');

// Create Task (NGO only)
exports.createTask = async (req, res) => {
    const { title, description, location, skillsRequired, urgency } = req.body;
  
    try {
      const task = new Task({
        title,
        description,
        location,
        skillsRequired,
        urgency,
        createdBy: req.user.userId,  // Attach the NGO's userId
      });
  
      await task.save();
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  };

  exports.updateTask = async (req, res) => {
    const { taskId } = req.params;  // Get taskId from URL params
    const { title, description, location, skillsRequired, urgency } = req.body;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Only the task creator (NGO) can update the task
      if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'You are not authorized to update this task' });
      }
  
      // Update the task fields with new data (if provided)
      task.title = title || task.title;
      task.description = description || task.description;
      task.location = location || task.location;
      task.skillsRequired = skillsRequired || task.skillsRequired;
      task.urgency = urgency || task.urgency;
  
      // Save updated task
      await task.save();
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  };

  // Get All Tasks (For Volunteers and NGOs)
exports.getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();  // This will return all tasks

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks available' });
    }

    // Send tasks as response
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};




  exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      // Find the task by taskId
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Ensure the user is authorized to delete the task (check user role and creator)
      if (!req.user || !req.user.userId || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized: Missing user details' });
      }
  
      // Check if the user is authorized to delete the task
      if (task.createdBy.toString() !== req.user.userId.toString() && req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'You are not authorized to delete this task' });
      }
  
      // Delete the task using `deleteOne`
      await Task.deleteOne({ _id: taskId });
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error("Error deleting task:", error);  // Log the error to debug
      res.status(500).json({ message: 'Error deleting task' });
    }
  };
  
  // Assign a Task to a Volunteer (Only NGOs can assign tasks)
exports.assignTask = async (req, res) => {
    const { taskId, volunteerId } = req.body;
  
    try {
      // Find the task by taskId
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Ensure that the user is an NGO
      if (req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'Only NGOs can assign tasks' });
      }
  
      // Check if the task is already assigned to someone
      if (task.assignedVolunteer) {
        return res.status(400).json({ message: 'Task is already assigned to someone' });
      }
  
      // Assign the volunteer to the task
      task.assignedVolunteer = volunteerId;
      await task.save();
  
      res.status(200).json({ message: 'Task assigned successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error assigning task' });
    }
  };
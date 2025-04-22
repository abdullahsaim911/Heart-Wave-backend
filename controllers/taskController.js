const Task = require('../models/taskModel');


exports.createTask = async (req, res) => {
    const { title, description, location, skillsRequired, urgency, date, time } = req.body;
  
    try {
      const task = new Task({
        title,
        description,
        location,
        skillsRequired,
        urgency,
        date,
        time,
        createdBy: req.user.userId,  
      });
  
      await task.save();
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  };


  exports.getMyTaskById = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const task = await Task.findOne({
        _id: taskId,
        createdBy: req.user.userId,  
      }).populate('createdBy', 'name email');
  
      if (!task) {
        return res.status(403).json({ message: 'You are not authorized to view this task' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ message: 'Error fetching task' });
    }
  };
  

  exports.updateTask = async (req, res) => {
    const { taskId } = req.params;  
    const { title, description, location, skillsRequired, urgency } = req.body;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      
      if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'You are not authorized to update this task' });
      }
  
      
      task.title = title || task.title;
      task.description = description || task.description;
      task.location = location || task.location;
      task.skillsRequired = skillsRequired || task.skillsRequired;
      task.urgency = urgency || task.urgency;
  
      
      await task.save();
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  };

  
exports.getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.find();  

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks available' });
    }

    
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};


exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId).populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
};


exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this NGO' });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching NGO tasks:", error);
    res.status(500).json({ message: 'Error fetching your tasks' });
  }
};

exports.getCompletedTasksByNgo = async (req, res) => {
  try {
    const completedTasks = await Task.find({ createdBy: req.user.userId, completed: true });
    res.status(200).json({ completedTasks });
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    res.status(500).json({ message: 'Error fetching completed tasks' });
  }
};


  exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      
      if (!req.user || !req.user.userId || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized: Missing user details' });
      }
  
      
      if (task.createdBy.toString() !== req.user.userId.toString() && req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'You are not authorized to delete this task' });
      }
  
      
      await Task.deleteOne({ _id: taskId });
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error("Error deleting task:", error);  
      res.status(500).json({ message: 'Error deleting task' });
    }
  };
  
  
exports.assignTask = async (req, res) => {
    const { taskId, volunteerId } = req.body;
  
    try {
      
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      
      if (req.user.role !== 'ngo') {
        return res.status(403).json({ message: 'Only NGOs can assign tasks' });
      }
  
      
      if (task.assignedVolunteer) {
        return res.status(400).json({ message: 'Task is already assigned to someone' });
      }
  
      
      task.assignedVolunteer = volunteerId;
      await task.save();
  
      res.status(200).json({ message: 'Task assigned successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error assigning task' });
    }
  };
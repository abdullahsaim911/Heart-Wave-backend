// models/taskHistoryModel.js
const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },  // Reference to the Task
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the Volunteer
  completionDate: { type: Date, default: Date.now },  // Date of task completion
}, { timestamps: true });

const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);
module.exports = TaskHistory;

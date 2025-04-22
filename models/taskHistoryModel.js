
const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },  
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  completionDate: { type: Date, default: Date.now },  
}, { timestamps: true });

const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);
module.exports = TaskHistory;

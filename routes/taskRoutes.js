// routes/taskRoutes.js
const express = require('express');
const { createTask, getAllTasks, assignTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

// POST /api/tasks - Only NGOs can create tasks
// Correct route handler
router.post('/', authMiddleware, roleMiddleware('ngo'), createTask);

// GET /api/tasks - All authenticated users can view tasks
router.get('/', authMiddleware, getAllTasks);  // Add more handlers as needed

// POST /api/tasks/assign - Only NGOs can assign tasks to volunteers
router.post('/assign', authMiddleware, roleMiddleware('ngo'), assignTask);

// PUT /api/tasks/:taskId - Only the task creator (NGO) can update tasks
router.put('/:taskId', authMiddleware, roleMiddleware('ngo'), updateTask);

router.delete('/:taskId', authMiddleware, roleMiddleware('ngo'), deleteTask);


module.exports = router;

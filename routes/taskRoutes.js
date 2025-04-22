const express = require('express');
const { createTask, getAllTasks, getTaskById, assignTask, getMyTaskById ,updateTask, deleteTask, getMyTasks } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();




router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyTasks); //GET /api/tasks/mine


router.get('/', authMiddleware, getAllTasks); //GET /api/tasks


router.get('/:taskId', authMiddleware, getTaskById); //GET /api/tasks/:taskId
router.get('/my/:taskId', authMiddleware, roleMiddleware('ngo'), getMyTaskById); //GET /api/tasks/my/:taskId



router.post('/', authMiddleware, roleMiddleware('ngo'), createTask); //POST /api/tasks


router.post('/assign', authMiddleware, roleMiddleware('ngo'), assignTask); // POST /api/tasks/assign





router.put('/:taskId', authMiddleware, roleMiddleware('ngo'), updateTask); //PUT /api/tasks/:taskId


router.delete('/:taskId', authMiddleware, roleMiddleware('ngo'), deleteTask); //DELETE /api/tasks/:taskId


module.exports = router;

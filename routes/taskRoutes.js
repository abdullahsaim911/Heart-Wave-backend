const express = require('express');
const { createTask, getAllTasks, getTaskById, assignTask, getMyTaskById ,updateTask, deleteTask, getMyTasks } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();




router.get('/mine', authMiddleware, roleMiddleware('ngo'), getMyTasks); //GET /api/tasks/my/:taskId

router.get('/', authMiddleware, getAllTasks);

router.get('/:taskId', authMiddleware, getTaskById); //GET /api/tasks/:taskId
router.get('/my/:taskId', authMiddleware, roleMiddleware('ngo'), getMyTaskById);


router.post('/', authMiddleware, roleMiddleware('ngo'), createTask);

router.post('/assign', authMiddleware, roleMiddleware('ngo'), assignTask);




router.put('/:taskId', authMiddleware, roleMiddleware('ngo'), updateTask);

router.delete('/:taskId', authMiddleware, roleMiddleware('ngo'), deleteTask);


module.exports = router;

const express = require('express');
const { createTask, getAllTasks, assignTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();


router.post('/', authMiddleware, roleMiddleware('ngo'), createTask);


router.get('/', authMiddleware, getAllTasks); 


router.post('/assign', authMiddleware, roleMiddleware('ngo'), assignTask);


router.put('/:taskId', authMiddleware, roleMiddleware('ngo'), updateTask);

router.delete('/:taskId', authMiddleware, roleMiddleware('ngo'), deleteTask);


module.exports = router;

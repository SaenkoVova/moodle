const {Router} = require('express');
const router = Router();
const TaskController = require('../controllers/task.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create_task',
    AuthMiddleware,
    TaskController.createTask
)

router.get(
    '/load_task_details',
    AuthMiddleware,
    TaskController.loadTaskDetails
)

router.post(
    '/add_answer',
    AuthMiddleware,
    TaskController.addAnswer
)

module.exports = router

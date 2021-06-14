const {Router} = require('express');
const router = Router();
const TaskController = require('../controllers/task.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create_task',
    AuthMiddleware,
    TaskController.createTask
)

module.exports = router

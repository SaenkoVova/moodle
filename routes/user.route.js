const {Router} = require('express');
const router = Router();
const UserController = require('../controllers/user.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');
const {check} = require('express-validator');

router.get(
    '/load_personal_info',
    AuthMiddleware,
    UserController.loadPersonalInfo
)

router.post(
    '/create_user',
    AuthMiddleware,
    UserController.createUser
)

router.get(
    '/load_students',
    AuthMiddleware,
    UserController.loadStudents
)

router.get(
    '/load_teachers',
    AuthMiddleware,
    UserController.loadTeachers
)

router.get(
    '/load_users_with_invaluable_works',
    AuthMiddleware,
    UserController.loadUsersWithInvaluableWorks
)

router.post(
    '/grade',
    AuthMiddleware,
    UserController.grade
)

module.exports = router

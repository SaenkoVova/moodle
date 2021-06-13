const {Router} = require('express');
const router = Router();
const GroupController = require('../controllers/group.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create_group',
    AuthMiddleware,
    GroupController.createGroup
)

router.get(
    '/load_groups',
    AuthMiddleware,
    GroupController.loadGroups
)

router.get(
    '/load_group_students',
    AuthMiddleware,
    GroupController.loadGroupStudents
)

router.get(
    '/load_group_courses',
    AuthMiddleware,
    GroupController.loadGroupCourses
)

module.exports = router

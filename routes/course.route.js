const {Router} = require('express');
const router = Router();
const CourseController = require('../controllers/course.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create_course',
    AuthMiddleware,
    CourseController.createCourse
)

router.get(
    '/load_courses',
    AuthMiddleware,
    CourseController.loadCourses
)


module.exports = router

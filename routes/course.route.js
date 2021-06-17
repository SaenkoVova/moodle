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

router.get(
    '/load_course_details',
    AuthMiddleware,
    CourseController.loadCourseDetails
)

router.get(
    '/load_course_tasks',
    AuthMiddleware,
    CourseController.loadCourseTasks
)
module.exports = router

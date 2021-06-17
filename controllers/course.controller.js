const User = require('../models/User')
const Course = require('../models/Course')
const Task = require('../models/Task')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.createCourse = async (req, res) => {
    try {
        let {title, description, teachers} = req.body;
        const emails = teachers.map(t => t.email)
        teachers = await User.find({role: 'teacher'}, '_id').where('email').in(emails).exec()
        teachers = teachers.map(t => t._id);
        const course = new Course({
            title,
            teachers,
            description,
            students: [],
            groups: [],
            tasks: []
        })
        await course.save();
        res.status(200).json({message: 'Курс створено'})
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


module.exports.loadCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadCourseTasks = async (req, res) => {
    try {
        const {courseId} = req.query;
        const course = await Course.findById(courseId);
        let tasks = await Task.find({}).where('_id').in(course.tasks).exec()
        res.status(200).json(tasks)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


module.exports.loadCourseDetails = async (req, res) => {
    try {
        const {courseId} = req.query;
        const course = await Course.findById(courseId);
        const teachers = await User.find({role: 'teacher'}, 'firstName secondName thirdName email').where('_id').in(course.teachers).exec();
        const user = await User.findOne({
            _id: req.user.userId,
            role: 'student',
            "tasks.courseId": ObjectId(courseId)
        });
        const tasksIds = user.tasks.map(i => ObjectId(i.taskId));
        const tasks = await Task.find({}, 'title').where('_id').in(tasksIds).exec()
        course.teachers = teachers;
        course.tasks = tasks;
        res.status(200).json(course)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

const Task = require('../models/Task')
const Course = require('../models/Course')
const User = require('../models/User')
const Group = require('../models/Group')
const ObjectId = require('mongoose').Types.ObjectId


module.exports.createTask = async (req, res) => {
    try {
        const baseUrl = 'localhost:5000/storage/';
        const {multipartFile} = req.files;
        const {courseId, groupId} = req.query;
        const {title, description} = req.body;
        const task = new Task({
            title, description
        });
        const savedTask = await task.save();
        const fileName = `${courseId}_${savedTask._id}.${multipartFile.mimetype.split('/')[1]}`
        await multipartFile.mv(`./storage/${fileName}`);
        savedTask.attachments.push(fileName);
        await savedTask.save();
        const course = await Course.findById(courseId);
        course.tasks.push(ObjectId(savedTask._id));
        await course.save();
        const group = await Group.findById(groupId);
        const students = await User.find({role: 'student'}).where('_id').in(group.students).exec();
        for(const student of students) {
            student.tasks.push({
                taskId: savedTask._id,
                courseId,
                status: 'not_performed',
                attachments: []
            })
            await student.save()
        }
        res.status(200).json({message: 'Завдання додано'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.addAnswer = async (req, res) => {
    try {
        const baseUrl = 'localhost:5000/storage/';
        const {courseId, taskId} = req.query;
        const {multipartFile} = req.files;
        const fileName = `${req.user.userId}_${courseId}_${taskId}.${multipartFile.mimetype.split('/')[1]}`
        await multipartFile.mv(`./storage/answers/${fileName}`);
        await User.updateOne({
            _id: ObjectId(req.user.userId),
            "tasks.taskId": taskId
        }, {
            $set: {
                "tasks.$.attachments": fileName,
                "tasks.$.status": 'performed'
            }
        })

        res.status(200).json({message: 'Завдання відправлено на перевірку'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadTaskDetails = async (req, res) => {
    try {
        const {taskId} = req.query;
        const task = await Task.findById(taskId);
        const user = await User.findById(req.user.userId);
        const userTask = user.tasks.find(i => String(i.taskId) === taskId);
        res.status(200).json({task, status: userTask.status});
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

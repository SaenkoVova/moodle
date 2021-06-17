const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Group = require('../models/Group');
const ObjectId = require('mongoose').Types.ObjectId;

exports.loadPersonalInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        res.status(200).json(user)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadStudents = async (req, res) => {
    try {
        const users = await User.find({role: 'student'}, 'email firstName secondName thirdName')
        res.status(200).json(users)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadTeachers = async (req, res) => {
    try {
        const users = await User.find({role: 'teacher'}, 'email firstName secondName thirdName')
        res.status(200).json(users)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.createUser = async (req, res) => {
    try {
        const {firstName, secondName, thirdName, email, role} = req.body;
        const candidate = await User.findOne({email});
        if(candidate) {
            return res.status(400).json({message: 'Користувач уже існує'});
        }
        const hashedPassword = await bcrypt.hash(email, 12);
        const user = new User({
            firstName,
            secondName,
            thirdName,
            role,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(200).json({message: 'Корисувача створено'})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadUsersWithInvaluableWorks = async (req, res) => {
    try {
        const {groupId, courseId, taskId} = req.query;
        const group = await Group.findById(groupId);
        const students = await User.find({
            role: 'student',
            "tasks.status": 'performed',
            "tasks.grade": 0,
            "tasks.courseId": courseId,
            "tasks.taskId": taskId,
        },
            'firstName secondName thirdName email tasks').where('_id').in(group.students).exec();
        res.status(200).json(students)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.grade = async (req, res) => {
    try {
        const {taskId, point} = req.body;
        console.log(taskId, point)
        let user = await User.updateOne({
            _id: ObjectId(req.user.userId),
            "tasks.taskId": taskId
        }, {
            $set: {
                "tasks.$.grade": point
            }
        })
        console.log(user)
        res.status(200).json({message: 'Оцінено'})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

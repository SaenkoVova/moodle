const Group = require('../models/Group');
const User = require('../models/User');
const Course = require('../models/Course');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.loadGroups = async (req, res) => {
    try {
        const groups = await Group.find({});
        res.status(200).json(groups)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadGroupStudents = async (req, res) => {
    try {
        const {groupId} = req.query;
        const group = await Group.findById(groupId);
        const students = await User.find({role: 'student'}).where('_id').in(group.students).exec()
        res.status(200).json(students)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadGroupCourses = async (req, res) => {
    try {
        const {groupId} = req.query;
        const group = await Group.findById(groupId);
        const courses = await Course.find({}, 'title').where('_id').in(group.courses).exec();
        res.status(200).json(courses);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


module.exports.createGroup = async (req, res) => {
    try {
        let {classTeacher, classSymbol, students, courses} = req.body;
        const teacher = await User.findOne({email: classTeacher.email})
        const emails = students.map(s => s.email)
        students = await User.find({role: 'student'}, '_id').where('email').in(emails).exec()
        students = students.map(s => ObjectId(s._id));
        courses = courses.map(c => ObjectId(c.id));
        const group = new Group({
            classSymbol: classSymbol,
            classTeacher: teacher._id,
            students,
            courses
        })
        await group.save();
        res.status(200).json({message: 'Клас створено'})
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

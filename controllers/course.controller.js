const User = require('../models/User')
const Course = require('../models/Course')

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

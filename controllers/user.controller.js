const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        console.log(firstName, secondName, thirdName, email, role)
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

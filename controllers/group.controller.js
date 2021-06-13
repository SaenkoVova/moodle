
module.exports.createGroup = async (req, res) => {
    try {
        const {classTeacher, classSymbol, students} = req.body;
        console.log(classTeacher)
        console.log(classSymbol)
        console.log(students)
        res.status(200)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

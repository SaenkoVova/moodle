const {Schema, model} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const schema = new Schema({
    classSymbol: {type: String, required: true},
    classTeacher: {type: ObjectId, required: true, ref: 'User'},
    students: [{type: ObjectId, ref: 'User'}],
    courses: [{type: ObjectId, ref: 'Course'}]
})

module.exports = model('Group', schema)

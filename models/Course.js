const {Schema, model} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const schema = new Schema({
    title: {type: String, required: true},
    teachers: [{type: ObjectId, ref: 'User'}],
    students: [{type: ObjectId, ref: 'User'}],
    description: [{type: String, required: true}],
    groups: [{type: ObjectId, ref: 'Group'}],
    tasks: [{type: ObjectId, ref: 'Task'}]
})

module.exports = model('Course', schema)

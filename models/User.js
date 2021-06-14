const {Schema, model} = require('mongoose')
const ObjetId = require('mongoose').Types.ObjectId

const schema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    thirdName: {type: String, required: true},
    role: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    courses: [{type: ObjetId, ref: 'Course'}],
    tasks: [
        {
            taskId: {type: ObjetId, ref: 'Task'},
            courseId: {type: ObjetId, ref: 'Course'},
            status: {type: String, required: true},
            attachments: [{type: String, required: true}]
        }
    ]
})

module.exports = model('User', schema)

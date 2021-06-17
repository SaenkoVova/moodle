const {Schema, model} = require('mongoose')
//const ObjectId = require('mongoose').Types.ObjectId

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    attachments: [{type: String, required: true}],
})

module.exports = model('Task', schema)

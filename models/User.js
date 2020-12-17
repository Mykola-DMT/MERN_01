const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    films: [{type: Types.ObjectId, ref:'Film'}],
})

module.exports = model('User',schema)

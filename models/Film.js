const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    genre: {type: String, required: true},
    year: {type: Number},
    isWatched: {type: Boolean, default: false},
    owner: {type:Types.ObjectId, ref:'User'}
})

module.exports = model('Film',schema)

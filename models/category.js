const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    t: String
})

module.exports = mongoose.model('categories', CategorySchema)
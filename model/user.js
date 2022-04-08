const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname:String,
    numberPhone:Number,

})

const User = mongoose.model('User', userSchema);
module.exports = User
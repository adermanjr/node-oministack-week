const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    url: String,
    bio: String,
    avatar_url: String,
    techs: [String],

});

module.exports = mongoose.model('User', UserSchema);
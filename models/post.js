const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creating schema for post
let post_Schema = new schema({
    body: String,
    type: String,
    image: String,
    date: Date,
    username: String,
    user_id: String,
    userEmail: String,
    userImage: String,
    like: Array,
    dislike: Array
});

module.exports = mongoose.model('Post',post_Schema);
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creating schema for user

let user_schema = new schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    p_image:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    }
    }
);

module.exports = mongoose.model('User',user_schema);

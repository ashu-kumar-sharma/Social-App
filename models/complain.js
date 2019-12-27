const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema for complain
let complain_schema= new Schema({
    status: {
        type: String,
        default: "Open"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    image: String,
    date: Date,
    username: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    assigned_email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Complain",complain_schema);

const express = require("express");
require('dotenv').config();
const post = require("./routes/post");
const user = require("./routes/user");
const login = require("./routes/login");
const complain = require('./routes/complain');
const cookieSession = require('cookie-session');
const passportSetup = require('./passport-setup/config');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
// const {cloudinaryConfig }= require('./constants/constant.js');
const path = require('path');


const PORT = process.env.PORT || 8000;
// app.delete('/notes/:noteId', notes.delete);
console.log(process.env.GOOGLE_CLIENT_ID);
const app = express();
app.use(cookieParser());
// creating cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['thisisttnbuzzz']
}));

//setup for cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(`${process.env.DB_URL}`);

app.use( (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login',login);
app.use('/posts',post);
app.use('/complain',complain);
app.use('/user',user);


app.listen(PORT, ()=> console.log("App is running on http://localhost:"+PORT));
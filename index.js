const express = require("express");
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
const {cloudinaryConfig }= require('./constants/constant');

const PORT = 8000;

const app = express();
app.use(cookieParser());
// creating cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['thisisttnbuzzz']
}));

//setup for cloudinary
cloudinary.config({
    cloud_name: cloudinaryConfig.name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(`mongodb://localhost/ttn_buzz`);

app.use( (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});



//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login',login);
app.use('/posts',post);
app.use('/complain',complain);
app.use('/user',user);


app.listen(PORT, ()=> console.log("App is running on http://localhost:"+PORT));
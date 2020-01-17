const express = require('express');
const route = express.Router();
const passport = require('passport');
const googleRedirect = require('../controllers/loginController');



//auth for google
route.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));

//callback route for google to redirect
route.get('/google/redirect',passport.authenticate('google'),googleRedirect.googleRedirect);
module.exports = route;
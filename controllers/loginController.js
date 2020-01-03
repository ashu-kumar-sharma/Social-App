const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../constants/constant.js');
const frontendUrl = require('../constants/constant.js');

module.exports = {
    googleRedirect: (req,res)=>{
        try {
            if(req && req.user && req.user.success){
                let userID = req.user._doc._id.toJSON();
                token = jwt.sign(userID, JWT_SECRET.jwtSecret.secret);
                res.cookie("token",token);
                res.redirect(process.env.FRONTENDURL);
            }
            else{
                res.redirect(process.env.FRONTENDURL);
            }
        }
        catch (e) {
            res.send({status : false, error : e});
        }


    }

};
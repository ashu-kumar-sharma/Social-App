const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../constants/constant');
const frontendUrl = require('../constants/constant');

module.exports = {
    googleRedirect: (req,res)=>{
        try {
            if(req && req.user && req.user.success){
                let userID = req.user._doc._id.toJSON();
                token = jwt.sign(userID, JWT_SECRET.jwtSecret.secret);
                res.cookie("token",token);
                res.redirect(frontendUrl.frontendUrl.url);
            }
            else{
                res.redirect(`http://localhost:3000/buzz`);
            }
        }
        catch (e) {
            res.send({status : false, error : e});
        }


    }

};
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
// const JWT_SECRET = require('../constants/constant.js');
// const frontendUrl = require('../constants/constant.js');

module.exports = {
        googleRedirect: (req,res)=>{
        try {
            console.log('heerererer');
            if(req && req.user && req.user.success){
                let userID = req.user._doc._id.toJSON();
                token = jwt.sign(userID, process.env.JWTSECRET);
                res.cookie("token",token);
                console.log('heerererer',process.env.FRONTENDURL);
                res.redirect(process.env.FRONTENDURL);
                
            }
            else{
                res.redirect(process.env.FRONTENDURL);
                // res.redirect(`https://ttn-buz.herokuapp.com`);

            }
        }
        catch (e) {
            res.send({status : false, error : e});
            // res.redirect('/ttn-bux.heroku.com')
        }


    }

};
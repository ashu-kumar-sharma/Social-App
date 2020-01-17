const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
// const google = require('../constants/constant.js');

//serialize user function
passport.serializeUser((user,done)=>{
    done(null,user);
});

//deserialize user function
passport.deserializeUser((id,done)=>{
    done(null, id)
});



passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://ttn-buz.herokuapp.com/login/google/redirect',
        proxy: true 
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('aaa');
        User.findOne({email: profile.emails[0].value}).then((res,err) =>{
            if(res)  //checking if user data is already in data base
            {
                console.log('aaa111');
                done(null,{...res, success: true});
            }
            else
            {
                if(profile.emails[0].value==='ashukumar2001@gmail.com')
                {

                    //creating new admin type user in local database
                    new User ({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        p_image: profile._json['picture'],
                        role: 'SuperAdmin'
                    }).save()
                        .then((response)=>{
                        done(null,response);
                        })
                        .catch((err)=>{
                            console.log("error in saving data",err);
                        })
                }
                else if(true)
                {
                    //creating new user type user in local database
                    new User ({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        p_image: profile._json['picture'],
                        role: 'User'
                    }).save()
                        .then((response)=>{
                        done(null,{...response, success: true});
                        })
                        .catch((err)=>{
                            console.log('error in saving data',err);
                        })
                }
                else {
                    done(null,{code: 401, success: false});
                }
            }
        })

    })
);
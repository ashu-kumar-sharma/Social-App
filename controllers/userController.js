const User = require('../models/user');
const nodemailer = require('nodemailer');
// const nodemailerConst = require('../constants/constant.js');

module.exports ={
    fetchUser:(req,res)=>{
        User.findOne({_id: req.user_id})
            .then((response)=>{
                res.send(response);
            })
            .catch((err)=>{
                res.send({status : false, error : err});
            })
    },
    fetchall: (req,res)=>{
        User.find()
            .then((response)=>{
                res.send(response);
            })
            .catch((err)=>{
                res.send({status : false, error : err});
            })
    },
    changeRole: (req,res)=>{
        User.findByIdAndUpdate(req.params.id,{$set:{role:req.body.data}},{new: true})
            .then((response)=>{
                //Handling Mailer
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.NODEMAILER_USER || nodemailerConst.nodemailerConst.user,
                        pass: process.env.NODEMAILER_PASSWORD || nodemailerConst.nodemailerConst.password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: nodemailerConst.nodemailerConst.user, // sender address
                    to: `${response.email}`, // list of receivers
                    subject: `User Role Updated`, // Subject line
                    text: `Your Role has been updated to ${response.role}`, // plain text body
                    html: `<h3><a href="http://localhost:3000">Click Here</a> for more details</h3>` ,// html body
                };
                transporter.sendMail(mailOptions);
                res.send(response);
            })
            .catch=(err)=>{
            res.send({status : 'failed', error : err});
        }
    }
}
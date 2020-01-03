const User = require('../models/user');
const cloudinary = require('cloudinary');
const Complain = require('../models/complain');
const mailer = require('../utils/mailer');
const validatePostInput = require('../validation/postValidation');


const assign= (obj)=> {
    return User.find(obj);
};



module.exports = {
    fileComplain: async (req,res)=>{
        if(req.file){
            var result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "TTNBUZZ/Complaints/",
            });
        }
        let assigned = assign({'role':req.body.department});
        var item;
        try {
            let newAssign = await assigned;
            if(newAssign.length==0){
                newAssign= await assign({'role':'SuperAdmin'})
            }
            item = newAssign[Math.floor(Math.random() * newAssign.length)];
        }
        catch (err) {
            console.log(err)
        }
        if(!validatePostInput(req.body)){
            res.send({status : 'failed', error : err});
        }
        User.findOne({_id: req.user_id})
            .then((response)=>{
                const newComplain = new Complain({
                    status: 'Open',
                    title: req.body.title,
                    body: req.body.concern,
                    department: req.body.department,
                    date: new Date(),
                    image: (req.file) ?(result.secure_url) : null,
                    username: response.username,
                    user_id: req.user_id,
                    email_id: response.email,
                    assigned_to: item.username,
                    assigned_email: item.email,
                })
                newComplain.save()
                    .then((result)=>{
                        
                        res.send(result);
                    })
                    .catch((err)=>{
                        res.send({status : '!failed', error : err});
                    })
            })
            .catch((err)=>{
                res.send({status : 'f!!ailed', error : err});
            })
    },

    fetchComplain : (req,res)=>{
        Complain.find({user_id : req.user_id})
            .then((response)=>{
                res.send(response);
            })
            .catch((err)=>{
                res.send({status : 'failed', error : err});
            })
    },

    fetchDepartmentComplain : (req,res) =>{
        Complain.find({assigned_email : req.query.email})
            .then((response)=>{
                res.send(response);
            })
            .catch((err)=>{
                res.send({status : false, error : err});
            })
    },

    fetchAllComplain : (req,res)=>{
        Complain.find()
            .then((response)=>{
                res.send(response);
            })
            .catch((err)=>{
                res.send({status : 'failed', error : err});
            })
    },
    changeComplainStatus: (req,res)=>{
        Complain.findByIdAndUpdate(req.params.id,{$set:{status:req.body.data}},{new: true})
            .then((response)=>{
                mailer.mailer(
                    response,
                    [response.email_id,response.assigned_email],
                    ['Your Complain Status is Updated','Complain status Updated Successfully'],
                    ['For Further Clarification Check Buzz Portal',''],
                    'Complain Details'
                );
                res.send(response);
            })
            .catch=(err)=>{
            res.send({status : 'failed', error : err});
        }
    }
};
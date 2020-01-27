const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('cloudinary');
const validatePostInput = require('../validation/postValidation');


module.exports = {
    savePostController: async (req, res) => {
        //handling post insertion in database
        if (req.file) {
            var result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "TTNBUZZ/Posts/",
            });
        }
        if(!validatePostInput(req.body)){
            res.send({status : 'failed', error : err});
        }
        User.findOne({_id: req.user_id})
            .then((response) => {
                const newPost = new Post({
                    body: req.body.body,
                    type: req.body.type,
                    image: (req.file) ? (result.secure_url) : "",
                    username: response.username,
                    userImage: response.p_image,
                    user_id: response.user_id,
                    userEmail: response.email,
                    date: new Date(),
                    like: [],
                    dislike: []
                });
                newPost.save()
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err)=>{
                        res.send({status : 'failed', error : err});
                    });
            })
            .catch((err)=>{
                res.send({status: 'failed',errors: err});
            })
    },

    fetchPost:(req,res)=>{
        Post.find().sort( { date: -1 } ).skip(parseInt(req.params.skip)).limit(5)
            .then((response)=>{
                if(!response){
                    response.send("NO POST POSTED");
                }
                else{
                    res.send(response);
                }
            })
            .catch((err)=>{
                res.send({status : 'failed', error : err});
            })
    },

    fetchNotification: (req,res)=>{
        console.log('hehehehehehe');
        Post.find().sort( { date: -1 } ).limit(5)
            .then((response,err)=>{
                if(!response){
                    res.send("No Post Found");
                }
                else{
                    res.send(response);
                }
            })
            .catch((err)=>{
                res.send({status : 'failed', error : err});
            })
    },

    deletePost: (req,res)=>{
        Post.findOneAndRemove({_id: req.params.id})
            .then((response)=>{
                res.send(response.id);
            })
            .catch((err)=>{
                res.send({status : 'failed', error : err});
            })
    },

    likePost: (req, res) => {
        Post.findOne({ _id : req.params.id})
            .then((response)=>{
                if(response.like.length === 0){
                    if(response.dislike.length ===0 ){
                        response.like.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                    else{
                        response.dislike = response.dislike.filter((item)=>{
                            if(item != req.user_id){
                                return item;
                            }
                        });
                        response.like.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                }
                else{
                    let lenght = response.like.length;
                    response.like = response.like.filter((item)=>{
                        if(item != req.user_id){
                            return item;
                        }
                    });

                    if(lenght === response.like.length ){
                        response.dislike = response.dislike.filter((item)=>{
                            if(item != req.user_id){
                                return item;
                            }
                        });
                        response.like.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                    else{
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            })
                    }
                }
            })
            .catch((err)=>{
                res.send({status: 'failed', error: err});
            })
    },

    dislikePost: (req,res)=>{
        Post.findOne({ _id : req.params.id})
            .then((response)=>{
                if(response.dislike.length === 0){
                    if(response.like.length ===0 ){
                        response.dislike.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                    else{
                        response.like = response.like.filter((item)=>{
                            if(item != req.user_id){
                                return item;
                            }
                        });
                        response.dislike.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                }
                else{
                    let lenght = response.like.length;
                    response.dislike = response.dislike.filter((item)=>{
                        if(item != req.user_id){
                            return item;
                        }
                    });

                    if(lenght===response.dislike.lenght){
                        response.like = response.like.filter((item)=>{
                            if(item != req.user_id){
                                return item;
                            }
                        });
                        response.dislike.push(req.user_id);
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                res.send(response);
                            }
                        );
                    }
                    else{
                        Post.updateOne({_id : response._id}, {$set : { like: response.like, dislike: response.dislike}})
                            .then((result)=>{
                                    res.send(response);
                                }
                            );
                    }
                }
            })
    }
}
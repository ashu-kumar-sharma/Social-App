const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('cloudinary');
const upload = require('../multer-setup/config-multer');
const route = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/index');

// route for save post in db
route.post('/savePost/',verifyToken,upload.single('image'),postController.savePostController);

// route for fetching post stored in db
route.get('/fetchPost/?:skip',verifyToken,postController.fetchPost);

// route for getting notification
route.get('/getNotification',verifyToken,postController.fetchNotification);

// route for deleting post
route.delete(`/removePost/?:id`,verifyToken,postController.deletePost);

// route for liking the post
route.patch(`/like/?:id`,verifyToken,postController.likePost);

// route for disliking the post
route.patch(`/dislike/?:id`,verifyToken,postController.dislikePost);

module.exports = route;
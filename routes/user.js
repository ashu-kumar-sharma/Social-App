const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/index');



//route for getting user data
route.get('/',verifyToken,userController.fetchUser);

//routes for getting all user
route.get('/fetchAll',verifyToken,userController.fetchall);

//route for changing user role
route.patch('/changeRole/?:id',userController.changeRole)


module.exports = route;
const upload = require('../multer-setup/config-multer');
const express = require('express');
const complainController = require('../controllers/complainController');
const route = express.Router();
const verifyToken = require('../middleware/index');




route.post(`/fileComplain/`,verifyToken,upload.single('image'),complainController.fileComplain);

route.get('/getcomplain/',verifyToken, complainController.fetchComplain);

route.get('/fetchAll', verifyToken,complainController.fetchAllComplain);

route.get('/fetchDepartmentComplain', verifyToken,complainController.fetchDepartmentComplain);

route.patch('/changestatus/?:id',verifyToken, complainController.changeComplainStatus);

module.exports= route;


const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../constants/constant/cloudinaryConfig');

cloudinary.config({
    cloud_name: cloudinaryConfig.cloudinaryConfig.name,
    api_key: cloudinaryConfig.cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.cloudinaryConfig.api_secret
});
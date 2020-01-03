const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../constants/constant/cloudinaryConfig');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
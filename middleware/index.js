const jwt = require('jsonwebtoken');
// const JWT_SECRET = require('../constants/constant.js');



const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authentication, process.env.JWTSECRET, (err, decoded) => {
        if (err)
            next(err);
        else {
            req.user_id = decoded;
            next();
        }
    })
}

module.exports = verifyToken;

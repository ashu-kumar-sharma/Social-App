const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../constants/constant');



const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authentication, JWT_SECRET.jwtSecret.secret, (err, decoded) => {
        if (err)
            next(err);
        else {
            req.user_id = decoded;
            next();
        }
    })
}

module.exports = verifyToken;

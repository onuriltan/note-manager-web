const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check bearer token is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from arraay
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
};

decodeToken = (req, res) => {
    let userData = "";
    jwt.verify(req.token, 'theSecretKey', (err, authData) => {
        if (err) { // Forbidden
            res.sendStatus(403);
        }
        userData = authData;
    });
    return userData;
};

const signToken = async (user, secretKey) => {
    return await new Promise((resolve, reject) => {
        jwt.sign({user}, secretKey, {expiresIn: '10m'}, (err, token) => {
            if (err) reject(err);
            resolve(token)
        });
    });
};
module.exports.decodeToken = decodeToken;
module.exports.verifyToken = verifyToken;
module.exports.signToken = signToken;

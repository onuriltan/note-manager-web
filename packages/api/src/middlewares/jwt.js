const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

const decodeToken = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    req.query.email = authData.email;
    next();
  });
};

const signToken = async (user) => {
  const email = user[user.method].email;
  return await new Promise((resolve, reject) => {
    jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

module.exports = {
  signToken,
  decodeToken,
  verifyToken,
};

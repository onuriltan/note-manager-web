const JwtOperations = require('../../../middlewares/jwt')

exports.loginWithFacebook = async (req, res) => {
  if (req.user) {
    const token = await JwtOperations.signToken(req.user)
    res.json({ token, method: req.user.method })
  } else {
    res.status(401)
  }
}

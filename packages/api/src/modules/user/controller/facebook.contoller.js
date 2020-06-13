const JwtOperations = require('../../../middlewares/jwt')

exports.loginWithFacebook = async (req, res) => {
  if (req.user) {
    const token = await JwtOperations.signToken(req.user)
    res.json({ token })
  } else {
    res.status(401)
  }
}

const jwt = require('../../../../middlewares/jwt')

exports.loginWithGoogle = async (req, res) => {
  if (req.user) {
    const token = await jwt.signToken(req.user)
    res.redirect(`${process.env.CLIENT_URL}/login/?googleToken=${token}`)
  } else {
    res.status(401)
  }
}

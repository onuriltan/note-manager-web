const validateChangePassword = (body) => {
  const { oldPassword, newPassword } = body
  const fieldErrors = {}
  if (!oldPassword) {
    fieldErrors.oldPassword = 'Password required.'
  } else if (oldPassword.length < 6) {
    fieldErrors.oldPassword = 'Password length should be 6.'
  }
  if (!newPassword) {
    fieldErrors.newPassword = 'Password required.'
  } else if (newPassword.length < 6) {
    fieldErrors.newPassword = 'Password length should be 6.'
  }

  return fieldErrors
}

module.exports.validateChangePassword = validateChangePassword

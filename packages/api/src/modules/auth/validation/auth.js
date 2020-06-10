const validateLogin = (requestBody) => {
  const { email, password } = requestBody
  const fieldErrors = {
    email: '',
    password: '',
  }
  if (!email) {
    fieldErrors.email = 'Email required.'
  } else if (!validEmail(email)) {
    fieldErrors.email = 'Email is not valid.'
  } else {
    fieldErrors.email = ''
  }
  if (!password) {
    fieldErrors.password = 'Password required.'
  } else if (password.length < 6) {
    fieldErrors.password = 'Password length should be 6.'
  } else {
    fieldErrors.password = ''
  }
  return fieldErrors
}

const validateRegister = (requestBody) => {
  const { email, password, password2 } = requestBody
  const fieldErrors = {
    email: '',
    password: '',
    password2: '',
  }
  if (!email) {
    fieldErrors.email = 'Email required.'
  } else if (!validEmail(email)) {
    fieldErrors.email = 'Email is not valid.'
  } else {
    fieldErrors.email = ''
  }
  if (!password) {
    fieldErrors.password = 'Password required.'
  } else if (password.length < 6) {
    fieldErrors.password = 'Password length should be 6.'
  } else {
    fieldErrors.password = ''
  }
  if (!password2) {
    fieldErrors.password2 = 'Repeat password required.'
  } else if (password2.length < 6) {
    fieldErrors.password2 = 'Repeat password length should be 6.'
  } else if (password2 !== password) {
    fieldErrors.password = 'Passwords does not match.'
    fieldErrors.password2 = 'Passwords does not match.'
  } else {
    fieldErrors.password2 = ''
    fieldErrors.password = ''
  }
  return fieldErrors
}

function validEmail(email) {
  const re = new RegExp(
    '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
  )
  return re.test(email)
}

module.exports.validateLogin = validateLogin
module.exports.validateRegister = validateRegister

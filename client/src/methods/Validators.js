export function validateRegister (email, password, password2) {
  let fieldErrors = {
    email: '',
    password: '',
    password2: ''
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

export function validateEmail (email) {
  let error = ''
  if (!email) {
    error = 'Email required.'
  } else if (!validEmail(email)) {
    error = 'Email is not valid.'
  } else {
    error = ''
  }
  return error
}

export function validatePassword (password) {
  let error = ''
  if (!password) {
    error = 'Password required.'
  } else if (password.length < 6) {
    error = 'Password length should be 6.'
  } else {
    error = ''
  }
  return error
}

export function validateLogin (email, password) {
  let fieldErrors = {
    email: '',
    password: ''
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

function validEmail (email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* eslint-disable no-useless-escape */
exports.passwordStrength = (password, password2) => {
  const errors = {
    password: '',
    password2: '',
  }
  if (!password) {
    errors.password = 'Password required.'
  } else if (password.length < 10 || password.length > 20) {
    errors.password = 'Password length should between 10 and 20.'
  } else if (!password.match(/[a-z]/)) {
    errors.password = 'Password should have at least one lowercase character.'
  } else if (!password.match(/[A-Z]/)) {
    errors.password = 'Password should have at least one uppercase character.'
  } else if (!password.match(/[0-9]/)) {
    errors.password = 'Password should have at least one uppercase character.'
  } else if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    errors.password = 'Password should have at least one special character.'
  } else {
    errors.password = ''
  }

  if (!password2) {
    errors.password2 = 'Repeat password required.'
  } else if (password.length < 10 || password.length > 20) {
    errors.password2 = 'Repeat password length should between 10 and 20.'
  } else if (!password2.match(/[a-z]/)) {
    errors.password = 'Password should have at least one lowercase character.'
  } else if (!password2.match(/[A-Z]/)) {
    errors.password = 'Password should have at least one uppercase character.'
  } else if (!password2.match(/[0-9]/)) {
    errors.password = 'Password should have at least one uppercase character.'
  } else if (!password2.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    errors.password = 'Password should have at least one special character.'
  } else if (password2 !== password) {
    errors.password = 'Passwords does not match.'
    errors.password2 = 'Passwords does not match.'
  } else {
    errors.password2 = ''
  }
  return {
    password: errors.password,
    password2: errors.password2,
  }
}

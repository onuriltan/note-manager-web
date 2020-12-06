const common = require('@notemanager/common');

export function validateRegister(email, password, password2) {
  const fieldErrors = {
    email: '',
    password: '',
    password2: ''
  };

  if (!email) {
    fieldErrors.email = 'Email required.';
  } else if (!validEmail(email)) {
    fieldErrors.email = 'Email is not valid.';
  } else {
    fieldErrors.email = '';
  }
  const errors = common.passwordStrength(password, password2);
  if (errors.password || errors.password2) {
    fieldErrors.password = errors.password;
    fieldErrors.password2 = errors.password2;
  }
  return fieldErrors;
}

export function validateEmail(email) {
  let error = '';
  if (!email) {
    error = 'Email required.';
  } else if (!validEmail(email)) {
    error = 'Email is not valid.';
  } else {
    error = '';
  }
  return error;
}

export function validatePassword(password) {
  let error = '';
  if (!password) {
    error = 'Password required.';
  } else if (password.length < 10) {
    error = 'Password length should be at least 10.';
  } else {
    error = '';
  }
  return error;
}

export function validateLogin(email, password) {
  const fieldErrors = {
    email: '',
    password: ''
  };

  return fieldErrors;
}

export function validateChangePassword(oldPassword, newPassword) {
  const fieldErrors = {
    oldPassword: '',
    newPassword: ''
  };
  if (!oldPassword) {
    fieldErrors.oldPassword = 'Old password required.';
  } else if (oldPassword.length < 10) {
    fieldErrors.oldPassword = 'Password length should be 10.';
  }
  if (!newPassword) {
    fieldErrors.newPassword = 'New password required.';
  } else if (newPassword.length < 10) {
    fieldErrors.newPassword = 'Password length should be 10.';
  }
  return fieldErrors;
}

function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

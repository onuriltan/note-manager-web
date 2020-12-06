export function validateRegister(email, password, password2) {
  const fieldErrors = {
    email: '',
    password: '',
    password2: '',
    errorCount: 0,
  };

  if (!email) {
    fieldErrors.email = 'Email required.';
  } else if (!validEmail(email)) {
    fieldErrors.email = 'Email is not valid.';
  } else {
    fieldErrors.email = '';
  }

  if (!password) {
    fieldErrors.password = 'Password required.';
  } else if (password.length < 10 || password.length > 20) {
    fieldErrors.password = 'Password length should between 10 and 20.';
    errorCount++;
  } else if (!password.match(/[a-z]/)) {
    fieldErrors.password = 'Password should have at least one lowercase character.';
    errorCount++;
  } else if (!password.match(/[A-Z]/)) {
    fieldErrors.password = 'Password should have at least one uppercase character.';
    errorCount++;
  } else if (!password.match(/[0-9]/)) {
    fieldErrors.password = 'Password should have at least one uppercase character.';
    errorCount++;
  } else if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    fieldErrors.password = 'Password should have at least one special character.';
    errorCount++;
  }

  if (!password2) {
    fieldErrors.password2 = 'Repeat password required.';
  } else if (password.length < 10 || password.length > 20) {
    fieldErrors.password2 = 'Repeat password length should between 10 and 20.';
  } else if (!password2.match(/[a-z]/)) {
    fieldErrors.password = 'Password should have at least one lowercase character.';
  } else if (!password2.match(/[A-Z]/)) {
    fieldErrors.password = 'Password should have at least one uppercase character.';
  } else if (!password2.match(/[0-9]/)) {
    fieldErrors.password = 'Password should have at least one uppercase character.';
  } else if (!password2.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    fieldErrors.password = 'Password should have at least one special character.';
  } else if (password2 !== password) {
    fieldErrors.password = 'Passwords does not match.';
    fieldErrors.password2 = 'Passwords does not match.';
  } else {
    fieldErrors.password = '';
    fieldErrors.password2 = '';
    errorCount = 0;
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
    password: '',
  };

  return fieldErrors;
}

export function validateChangePassword(oldPassword, newPassword) {
  const fieldErrors = {
    oldPassword: '',
    newPassword: '',
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

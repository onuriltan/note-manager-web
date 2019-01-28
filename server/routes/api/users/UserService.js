const express = require('express');
const router = express.Router();
const UserValidation = require('./validation/UserValidation');
const UserDbService = require('./db/UserDbService');

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let fieldErrors = UserValidation.validateLogin(req.body);
    let isValid = fieldErrors.email === "" && fieldErrors.password === "";

    if (!isValid) {
        res.status(400).json({fieldErrors});
    } else {
        UserDbService.findUser(email, password, res);
    }
});

router.post('/register', (req, res) => {
    const {email, password} = req.body;
    //Check required fields
    let fieldErrors = UserValidation.validateRegister(req.body);
    let isValid = fieldErrors.email === "" && fieldErrors.password === "" && fieldErrors.password2 === "";
    if (!isValid) {
        res.status(400).json({fieldErrors});
    } else {
        UserDbService.createUser(email, password, res)
    }
});

router.get('/confirm/:confirmationToken', (req, res) => {
    const confirmationToken = req.params.confirmationToken;
    UserDbService.findUserWithConfirmationToken(confirmationToken, res)
});


module.exports = router;

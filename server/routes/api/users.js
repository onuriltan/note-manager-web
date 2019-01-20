const express = require('express');
const router = express.Router();
const JwtOperations = require('../../config/JwtOperations');

const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let errors = [];
    let fieldErrors = {
        email: "",
        password: ""
    };
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
    let isValid = fieldErrors.email === "" && fieldErrors.password === ""

    if (!isValid) {
        res.status(400).json({fieldErrors})
    } else {
        User.findOne({email})
            .then(user => {
                if (user) {
                    let isPasswordCorrect = bcrypt.compareSync(password, user.password);
                    console.log(isPasswordCorrect)
                    if (isPasswordCorrect) {
                        JwtOperations.signToken(user, 'theSecretKey', res);
                    } else {
                        errors.push({msg: 'Username or password is wrong'});
                        res.status(401).json({errors})
                    }
                } else {
                    errors.push({msg: 'Username or password is wrong'});
                    res.status(401).json({errors})
                }
            })
    }
});

router.post('/register', (req, res) => {
    const {email, password, password2} = req.body;
    let fieldErrors = {
        email: "",
        password: "",
        password2: "",
    };
    let errors = [];
    let messages = [];

    //Check required fields
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
    let isValid = fieldErrors.email === "" && fieldErrors.password === "" && fieldErrors.password2 === ""
    if (!isValid) {
        res.status(400).json({fieldErrors})
    } else {
        User.findOne({email})
            .then(user => {
                if (user) {
                    errors.push({msg: 'This email is already registered'});
                    res.status(400).json({errors})
                } else {
                    const newUser = new User({
                        email,
                        password
                    });
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash; // Set password to hashed
                            newUser.save() // save user
                                .then(() => {
                                    messages.push({msg: 'Successfully registered, you can now login!'});
                                    res.status(200).json({messages})
                                })
                                .catch(err => console.log(err));
                        }))
                }
            })
    }
});

function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

module.exports = router;


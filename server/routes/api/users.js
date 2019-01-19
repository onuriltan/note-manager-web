const express = require('express');
const router = express.Router();
const JwtOperations = require('../../config/JwtOperations');

const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    let errors = [];
    if (!username || !password) {
        errors.push({msg: 'Please enter all the fields'});
        res.status(400).json({errors})
    }
    else if (username !== 'onur.iltan@gmail.com' || password !== 'p') {
        errors.push({msg: 'Username or password is wrong'});
        res.status(401).json({errors})
    }
    else {
        // mock user
        const user = {
            id: 1,
            username: username,
            email: username
        };
        JwtOperations.signToken(user, 'theSecretKey', res);
    }
});

router.post('/register', (req, res) => {
    const { name, email, password, password2} = req.body;
    let errors = [];
    console.log(req.body);
    //Check required fields
    if(!name  && !email && !password && !password) {
        errors.push({msg: 'Please enter all the fields'});
        res.status(400).json({errors})
    }
    if(password !== password2) {
        errors.push({msg: 'Passwords do not match'});
        res.status(400).json({errors})
    }
    if(password.length < 6 ) {
        errors.push({msg: 'Password length should be 6'});
        res.status(400).json({errors})
    }
    // end of check required fields
    if(errors.length > 0) {
        res.status(400).json({errors})
    }else {
        User.findOne({ email })
            .then(user => {
                if (user){
                    errors.push({msg: 'This email is already registered'});
                    res.status(400).json({errors})
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash; // Set password to hashed
                            newUser.save() // save user
                                .then( res.json({ "msg": 'successfully registered' }))
                                .catch(err => console.log(err));
                    }))
                }
            })
    }
});

module.exports = router;


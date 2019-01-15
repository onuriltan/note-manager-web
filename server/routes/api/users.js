const express = require('express');
const router = express.Router();
const JwtOperations = require('../../config/JwtOperations');


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
    console.log(req.body);
    res.send('Register ')
});

module.exports = router;


const express = require('express');
const router = require = express.Router();

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    let errors = [];
    if (!username || !password) {
        errors.push({msg: 'Please enter all the fields'});
        res.status(400).json({errors})
    }
    else if (username !== 'john@doe.com' || password !== 'p') {
        errors.push({msg: 'Username or password is wrong'});
        res.status(401).json({errors})
    }
    else {
        res.send('logged in!')
    }

});
router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Register ')
});

module.exports = router;


const User = require('../entity/User');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const JwtOperations = require('../../../../config/JwtOperations');
const uniqid = require('uniqid');
const MailOperations = require('../../../../config/MailOperations');

const findUser = (email, password, res) => {
    let errors = [];
    User.findOne({email})
        .then(user => {
            if (user) {
                let isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if (!user.active) {
                    errors.push({msg: 'You need to activate your account'});
                    res.status(401).json({errors});
                } else if (user.active && isPasswordCorrect) {
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
};

const findUserWithConfirmationToken = (confirmationToken, res) => {
    let errors = [];
    User.findOne({confirmationToken})
        .then(user => {
            if (user) {
                let expiry = user.confirmationTokenExpiry;
                let compare = new Date().setDate(new Date().getDate() + 1);
                if (expiry < compare) {
                    user.confirmationToken = undefined;
                    user.confirmationTokenExpiry = undefined;
                    user.active = true;
                    user.save((err, updatedUser) => {
                        if (err) console.log(err);
                        else console.log(updatedUser.name + " activated")
                    });
                    JwtOperations.signToken(user, 'theSecretKey', res);
                } else {
                    User.deleteOne({_id: new mongodb.ObjectID(user.id)});
                    errors.push({msg: 'Your account is expired, please re-register'});
                    res.status(401).json({errors})
                }
            } else {
                errors.push({msg: 'No new user found with that token'});
                res.status(404).json({errors})
            }
        })
};

const createUser = (email, password, res) => {
    let errors = [];
    let messages = [];
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
                        newUser.confirmationToken = uniqid();
                        newUser.save() // save user
                            .then(() => {
                                MailOperations.sendConfirmationMail(newUser.email, newUser.confirmationToken)
                                    .then(response => {
                                        messages.push({msg: 'Check your email to confirm your account!'});
                                        res.status(200).json({messages});
                                    })
                                    .catch(err => {
                                        User.deleteOne({_id: new mongodb.ObjectID(newUser.id)}).then(() => {// in mongo id is a special type of ObjectID
                                                errors.push({msg: 'An error occurred while sending e-mail.'});
                                                res.status(400).json({errors});
                                            }
                                        );
                                    })
                            })
                            .catch(err => {
                                messages.push({msg: 'An error occurred'});
                                res.status(400).json({messages})
                                console.log(err)
                            });
                    }))
            }
        })
};

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.findUserWithConfirmationToken = findUserWithConfirmationToken;

const User = require('../../../../models/User');
const bcrypt = require('bcrypt');
const JwtOperations = require('../../../../config/JwtOperations');


const findUser = (email, password, res) => {
    let errors = [];
    User.findOne({email})
        .then(user => {
            if (user) {
                let isPasswordCorrect = bcrypt.compareSync(password, user.password);
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
                        newUser.save() // save user
                            .then(() => {
                                messages.push({msg: 'Successfully registered, you can now login!'});
                                res.status(200).json({messages})
                            })
                            .catch(err => console.log(err));
                    }))
            }
        })
};

module.exports.findUser = findUser;
module.exports.createUser = createUser;

const User = require('../entity/User');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');

const findUser = async (email) => {
    let theUser = null;
    await User.findOne({email})
        .then(user => {
            theUser = user;
        })
    return theUser;
};

const findUserWithConfirmationToken = async (confirmationToken) => {
    let theUser = null;
    await User.findOne({confirmationToken})
        .then(user => {
            theUser = user;
        });
    return theUser;
};

const createUser = async (email, password) => {
    let theUser = null;
    const newUser = new User({
        email,
        password
    });
    //Hash password
    let hash = await hashPassword(newUser);
    newUser.password = hash; // Set password to hashed
    newUser.confirmationToken = uniqid();
    await newUser.save() // save user
        .then(() => {
            theUser = newUser;
        })
        .catch(err => {
            console.log(err)
        });
    return theUser;
};

const deleteUser = async (id) => {
    let isDeleted = null;
    await User.deleteOne({_id: new mongodb.ObjectID(id)})
        .then(() => isDeleted = true )
        .catch( () => isDeleted = false )
    return isDeleted
};


async function hashPassword (user) {
    const password = user.password;
    const saltRounds = 10;
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.findUserWithConfirmationToken = findUserWithConfirmationToken;

const express = require('express');
const router = express.Router();
const UserDbService = require('./db/UserDbService');
const UserValidation = require('./validation/UserValidation');
const JwtOperations = require('../../../config/JwtOperations');
const _ = require('lodash')

router.get('/getUser', JwtOperations.verifyToken, async (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const userProfile = await UserDbService.getUser(email);
        if (userProfile !== null) {
            res.send(userProfile);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(401).send();
    }

});

router.post('/changePassword', JwtOperations.verifyToken, async (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const {oldPassword, newPassword} = req.body;
        const fieldErrors = UserValidation.validateChangePassword(req.body);
        if (!_.isEmpty(fieldErrors)) {
            res.status(400).json({fieldErrors});
        } else {
            const isPasswordChanged = await UserDbService.changePassword(email, oldPassword, newPassword);
            if (isPasswordChanged) {
                res.status(200).send();
            } else {
                res.status(400).json(
                    {
                        "fieldErrors" : {
                            "oldPassword" : "Password is wrong"
                        }
                });
            }
        }
    } else {
        res.status(401).send();
    }

});


module.exports = router;

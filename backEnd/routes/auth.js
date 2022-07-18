const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userControl = require('../controllers/auth');
const fetchUser = require('../middleware/fetchUser');

//POST at '/auth/register': To create a new user. Registering a new user
router.route('/register')
    .post([
        body('userName').isLength({min: 3}).exists(),
        body('email').isEmail().exists(),
        body('password').isStrongPassword().isLength({min: 8}).exists()
    ], userControl.createUser)

//POST at '/auth/login': To login an existing user. No login required at the moment.
router.route('/login')
    .post([
        body('email').isEmail().exists(),
        body('password').isStrongPassword().isLength({min: 8}).exists()
    ], userControl.loginUser)

//POST at '/auth/getUserDetails': To get the logged in user details. Login required.
router.route('/getUserDetails')
    .post([
        body('email').isEmail().exists(),
        body('password').isStrongPassword().isLength({min: 8}).exists()
    ],
    fetchUser,
    userControl.getUserDetails)

module.exports = router;
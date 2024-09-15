const express = require('express');
const { signup, Login, Logout } = require('../controllers/userController');

const router = express.Router();


router.route('/signup').post(signup);
router.route('/login').get(Login);
router.route('/logout').get(Logout);

module.exports = router;
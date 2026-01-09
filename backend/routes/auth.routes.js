const express = require('express');
const router = express.Router();


const { registerUser, loginUser, getUserInfo } = require('../controller/auth.controller');

router.post('/register', registerUser);

router.post('/login', loginUser);

//router.get('/getUser', protect, getUserInfo);

module.exports = router;
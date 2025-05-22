const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controller/UserController');
const { isLoggedIn } = require('../authentication/Authentication');
const router = express.Router();

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/verify', isLoggedIn, (req, res) => {
    res.json({ user: req.user });
})

module.exports = router
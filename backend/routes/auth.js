const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// router.post('/register', authController.register); // No register function exported
router.post('/login', authController.loginUser);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middleware/validator');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', validateSignup, handleValidationErrors, authController.signup);
router.post('/login', validateLogin, handleValidationErrors, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;

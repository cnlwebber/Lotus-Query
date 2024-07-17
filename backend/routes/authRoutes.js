const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// handles POST (sending data to the server) requests from ./signup and ./login endpoints
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
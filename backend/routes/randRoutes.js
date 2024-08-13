const express = require('express');
const { getRandomCard } = require('../controllers/randController.js');
const router = express.Router();

// handes a GET request (getting information from the server) from the home page
router.get('/', getRandomCard);

module.exports = router;
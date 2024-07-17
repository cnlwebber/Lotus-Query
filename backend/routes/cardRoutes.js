const express = require('express');
const { getCards } = require('../controllers/cardController');
const router = express.Router();

// handes a GET request (getting information from the server) from the home page
router.get('/', getCards);

module.exports = router;
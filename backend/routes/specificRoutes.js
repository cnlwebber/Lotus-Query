const express = require('express');
const { scryfallSearch } = require('../controllers/cardController.js');
const router = express.Router();

// handes a GET request (getting information from the server) from the home page
router.get('/scry/:scryfall_id', scryfallSearch);

module.exports = router;
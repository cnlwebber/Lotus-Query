const express = require('express');
const { getHomeCards, queryCards } = require('../controllers/cardController.js');
const router = express.Router();

// handes a GET request (getting information from the server) from the home page
router.get('/', getHomeCards);
router.get('/search', queryCards);

module.exports = router;
const express = require('express');
const { getHomeCards, queryCards } = require('../controllers/cardController');
const router = express.Router();

// handes a GET request (getting information from the server) from the home page
router.get('/', getHomeCards);
router.post('/search', queryCards);

module.exports = router;
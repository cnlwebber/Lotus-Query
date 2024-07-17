const { getAllCards } = require('../models/cardModel.js');

// Once again, just an example. We will have to fetch cards likely using similar syntax to scryfall. Will likely use a lot of regex.
// 'o:text' tag means, search for any cards with 'text' in its description
// 'c:r' tag means, search for any cards that include the color red
exports.getCards = async (req, res) => {
    try {
        const cards = await getAllCards();
        // 200 status code is the "OK" code (successful HTTP request)
        res.status(200).json(cards);
    } catch (error) {
        // 500 status code is a generic error code
        res.status(500).json({ error: 'Error fetching cards' });
    }
};



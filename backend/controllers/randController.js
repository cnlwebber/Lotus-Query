const { getRandCards } = require('../models/cardModel.js');


// number of random cards for the home display
const randDisplay = 1;

exports.getRandomCard = async (_req, res) => {
    try {
        const cards = await getRandCards(randDisplay);
        // 200 status code is the "OK" code (successful HTTP request)
        res.status(200).json(cards);
        
    } catch (error) {
        // 500 status code is a generic error code
        res.status(500).json({ error: 'Error fetching cards' });
    }
};
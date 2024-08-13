const { getRandCards, getCardQuery } = require('../models/cardModel.js');


// number of random cards for the home display
const homeDisplay = 5;

exports.getHomeCards = async (_req, res) => {
    try {
        const cards = await getRandCards(homeDisplay);
        // 200 status code is the "OK" code (successful HTTP request)
        res.status(200).json(cards);
        
    } catch (error) {
        // 500 status code is a generic error code
        res.status(500).json({ error: 'Error fetching cards' });
    }
};

exports.queryCards = async (req, res) => {
    try {
        const queryRes = await getCardQuery(req);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cards' })
    }
}

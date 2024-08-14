const { getRandCards, searchCards, idSearch } = require('../models/cardModel.js');


// number of random cards for the home display
const homeDisplay = 5;

exports.getHomeCards = async (req, res) => {
    try {
        const cards = await getRandCards(req.query.n);
        // 200 status code is the "OK" code (successful HTTP request)
        res.status(200).json(cards);
        
    } catch (error) {
        // 500 status code is a generic error code
        res.status(500).json({ error: 'Error fetching home cards' });
    }
};

exports.queryCards = async (req, res) => {
    try {
        const queryRes = await searchCards(req);
        res.status(200).json(queryRes);
    } catch (error) {
        res.status(500).json({ error: 'Error querying cards' })
    }
}

exports.scryfallSearch = async (req, res) => {
    const scryfall_id = req.params.scryfall_id;
    try {
        const scryCard = await idSearch(scryfall_id);
        res.status(200).json(scryCard);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching card with scryfall id'})
    }
}
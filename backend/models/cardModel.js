const db = require('../config/db');
const homeDisplay = 10;

// This will NOT be a thing we use in the end product, it would take forever. Just an example.
const getRandCards = async (numOfCards) => {
    const [rows] = await db.execute('SELECT * FROM cards ORDER BY RAND() LIMIT (?)',
        [numOfCards]
    );
    return rows;
};

const searchCards = async() => {
    // i dunno lot of regex stuff here
    // use req.body to extract userQuery
    const query = req.body;
};

module.exports = { getRandCards, searchCards };
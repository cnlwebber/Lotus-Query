const db = require('../config/db');

// This will NOT be a thing we use in the end product, it would take forever. Just an example.
const getAllCards = async () => {
    const [rows] = await db.execute('SELECT * FROM cards');
    return rows;
};

module.exports = { getAllCards };
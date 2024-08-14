const db = require('../config/db.js');

const getRandCards = async (numOfCards) => {
    const [rows] = await db.query(`SELECT * FROM cards ORDER BY RAND() LIMIT ${numOfCards}`);
    return rows;
};


const idSearch = async (scryfall_id) => {
    const [rows] = await db.execute(`
        SELECT DISTINCT * 
        FROM cards 
        NATURAL JOIN legality 
        NATURAL JOIN cmc 
        LEFT OUTER JOIN creature USING (uuid)
        NATURAL JOIN color
        NATURAL JOIN sets 
        WHERE scryfall_id = ?
        LIMIT 1
    `, [scryfall_id]);
    console.log(rows);
    return rows;
}

const checkOperator = (string) => {
    let code, i, len;
    for (i = 0, len = string.length; i < len; i++) {
        code = string.charCodeAt(i);
        if (code > 47 && code < 58) {
            return false;
        }
    }
    // return true if both are NOT numeric
    return true;
}

const searchCards = async (req) => {
    let queryString = req.query.query;
    let baseQuery = 'SELECT * FROM cards';
    let conditions = [];
    let values = [];
    let nameSearch = ''; 
    let flag = true
    const filters = queryString.split(' ');
    filters.forEach(filter => {
        if (filter.startsWith('cmc')) {
            let operator, value;
            if (checkOperator(filter.slice(3, 5))) {
                operator = filter.slice(3, 5);
                value = filter.slice(5);
            } else {
                operator = filter.slice(3, 4);
                value = filter.slice(4);
            }
            conditions.push(`cmc.cmc ${operator} ?`);
            values.push(parseInt(value, 10));
            baseQuery += ' INNER JOIN cmc ON cards.mana_cost = cmc.mana_cost';

        } else if (filter.startsWith('pow')) {
            let operator, value;
            if (checkOperator(filter.slice(3, 5))) {
                operator = filter.slice(3, 5);
                value = filter.slice(5);
            } else {
                operator = filter.slice(3, 4);
                value = filter.slice(4);
            }
            
            conditions.push(`creature.power ${operator} ?`);
            values.push(value);
            
            if (flag) {
                baseQuery += ' INNER JOIN creature ON cards.uuid = creature.uuid';
                flag = false
            }

        } else if (filter.startsWith('tou')) {
            let operator, value;
            if (checkOperator(filter.slice(3, 5))) {
                operator = filter.slice(3, 5);
                value = filter.slice(5);
            } else {
                operator = filter.slice(3, 4);
                value = filter.slice(4);
            }
            conditions.push(`creature.toughness ${operator} ?`);
            values.push(value);
            if (flag) {
                baseQuery += ' INNER JOIN creature ON cards.uuid = creature.uuid';
                flag = false
            }

        } else if (filter.startsWith('color:')) {
            const color = filter.slice(6);
            conditions.push('cards.color LIKE ?');
            values.push(`%${color}%`);

        } else if (filter.startsWith('cmm:')) {
            const cmm = filter.slice(4);
            conditions.push('cards.color_identity = ?');
            values.push(cmm);

        } else if (filter.startsWith('r:') || filter.startsWith('rarity:')) {
            const rarity = filter.includes('rarity:') ? filter.slice(7) : filter.slice(2);
            conditions.push('cards.rarity = ?');
            values.push(rarity);

        } else if (filter.startsWith('l:') || filter.startsWith('legal:')) {
            const legalFormat = filter.includes('legal:') ? filter.slice(6) : filter.slice(2);
            conditions.push(`legality.${legalFormat} = 'legal'`);
            baseQuery += ' INNER JOIN legality ON cards.uuid = legality.uuid';

        } else if (filter.startsWith('s:') || filter.startsWith('set:')) {
            const set = filter.includes('set:') ? filter.slice(4) : filter.slice(2);
            conditions.push('cards.set_id = ?');
            values.push(set);

        } else {
            nameSearch += `%${filter}% `;
        }
    });

    nameSearch = nameSearch.trim()
    if (nameSearch) {
        conditions.push('cards.name LIKE ?');
        values.push(nameSearch);
    }

    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.execute(baseQuery, values);
    return rows;
};

module.exports = { getRandCards, searchCards, idSearch };
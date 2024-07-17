const db = require('../config/db');
const bcrypt = require('bcryptjs');

// db requests return lists of tuples, where the tuples are basically jsons
const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result;
};

// so, the returned user here may have it's data accessed by rows[0].username, rows[0].email, and so on
const findUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };



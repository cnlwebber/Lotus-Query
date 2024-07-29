const db = require('../config/db');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

const hash = async (passowrd) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (e) {
        return e;
    }
}

// db requests return lists of tuples, where the tuples are basically jsons
const createUser = async (username, email, password) => {
    const hashedPassword = hash(password);
    // maybe creation date attribute?
    // const date = Date();
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



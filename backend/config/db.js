const mysql = require('mysql2');
require('dotenv').config();

// creates connection, specifies database information.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const testConnection = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Connected to the database.');

        // Run a simple query to verify the connection.
        const [rows, fields] = await connection.query('SELECT * FROM cards LIMIT 1');
        console.log('Query result:', rows);
 
        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        pool.end(); // Close the pool to end all connections.
    }
};

// Execute the test function if the script is run directly.
if (require.main === module) {
    testConnection();
}

module.exports = pool.promise();

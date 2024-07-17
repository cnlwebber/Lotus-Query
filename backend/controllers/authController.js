const { createUser, findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await createUser(username, email, password);
        // 201 status: successful request that created something
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        // If user does not exist, or the passwords do not match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // 401 status code, request can't be completed because invalid authentication
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // JWT token with id and environment variable key
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        // basically sends a cookie to the user
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
  }
};
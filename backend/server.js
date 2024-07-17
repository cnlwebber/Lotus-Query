const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
require('dotenv').config();
const db = require('./config/db');

const app = express();

// enables cross-origin resource sharing, so will be useful if we end up fetching images from scryfall rather than a database
app.use(cors());

// parses JSON requests, used in authController (POST request data stored in req.body)
app.use(express.json());

// Set route prefixes here for organization. (GET /signup) becauomes (GET /api/auth/signup) 
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);

// Port is either set by the environment when hosting online or defaults to 5000 when hosting locally
const PORT = process.env.PORT || 5000;

// listens for requests, sends them through the routes
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

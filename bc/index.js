"use strict";

const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

// Database connection
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

// Middleware for handling async errors
require('express-async-errors');

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "https://kellerstore-uk0g.onrender.com", "https://kellerstore.vercel.app"];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());

// Serve static files from the 'upload' directory
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Custom Middleware
app.use(require('./src/middlewares/authentication'));
app.use(require('./src/middlewares/findSearchSortPage'));

// Home route
app.all('/', (req, res) => {
    res.send(`
        <h3>Stock Management API Service</h3>
        <hr>
        <p>
            Documents:
            <ul> 
                <li><a href="/documents/swagger">SWAGGER</a></li>
                <li><a href="/documents/redoc">REDOC</a></li>
                <li><a href="/documents/json">JSON</a></li>
            </ul>
        </p>
    `);
});

// Routes
app.use(require('./src/routes'));

// Error Handling Middleware
app.use(require('./src/middlewares/errorHandler'));

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});

/* ------------------------------------------------------- */
// Synchronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clears the database.

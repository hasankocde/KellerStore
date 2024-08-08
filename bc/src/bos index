"use strict";

const express = require('express');
const path = require('path'); // Import the path module
const http = require('http');
const app = express();
// const server = http.createServer(app);

require('dotenv').config({ path: __dirname + '/.env' });
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;

require('express-async-errors');

const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

// require('../keller_be/src/middlewares/logger');

// const startServer = require('./server.js');
// startServer(app, server);

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Serve static files from the 'upload' directory
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Özel Middleware'ler:
app.use(require('./src/middlewares/authentication'));
app.use(require('./src/middlewares/findSearchSortPage'));

// Ana Sayfa Yolu:
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

// Rotalar:
app.use(require('./src/routes'));

// Hata Yöneticisi Middleware:
app.use(require('./src/middlewares/errorHandler'));

// Sunucuyu Çalıştır:
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.

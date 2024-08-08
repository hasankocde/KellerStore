"use strict"
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// Önce app.use(logger) satırını kaldırın
console.log("Before logger middleware"); 

try {
    fs.mkdirSync('./logs', { recursive: true });

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    const logger = morgan('combined', {
        stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
    });

    // Sonra logger middleware'ini buraya ekleyin
    app.use(logger);
} catch (error) {
    console.error("Error setting up logger:", error);
}

console.log("After logger middleware");

app.use(require('./authentication'))
app.use(require('./findSearchSortPage'))

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

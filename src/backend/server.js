const express = require('express');
const db = require('./database/db');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// API endpoint to get sentences data
app.get('/sentences', (req, res) => {
    db.query('SELECT * FROM sentences', function (err, results) {
        if (err) {
            console.error('Error fetching sentences:', err);
            return res.status(500).send('Error fetching sentences');
        }
        res.json(results); // Send JSON response with the queried data
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

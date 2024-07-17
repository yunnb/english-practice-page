const express = require('express');
const db = require('./database/db');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());  // CORS 문제 해결

app.get('/sentences', (req, res) => {
    db.query('SELECT * FROM sentences', function (err, results) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

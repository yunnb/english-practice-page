const express = require('express');
const db = require('./database/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 문장 조회 API
app.get('/sentences', (req, res) => {
    db.query('SELECT * FROM sentences', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 단어 조회 API
app.get('/words', (req, res) => {
    db.query('SELECT * FROM words', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 문장과 리뷰를 함께 조회하는 API
app.get('/sentences-with-reviews', (req, res) => {
    const query = `
        SELECT s.*, r.review_date
        FROM sentences s
                 LEFT JOIN review r ON s.id = r.sentence_id
        ORDER BY r.review_date ASC
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 문장 추가 API
app.post('/sentences', (req, res) => {
    const { korean_text, english_text, note } = req.body;
    const query = 'INSERT INTO sentences (korean_text, english_text, note) VALUES (?, ?, ?)';

    db.query(query, [korean_text, english_text, note], (err, results) => {
        if (err) return res.status(500).send(err);

        const sentence_id = results.insertId;

        // 문장 추가 후 기본 리뷰 항목 생성
        const reviewQuery = `
            INSERT INTO review (sentence_id, review_date, review_count)
            VALUES (?, NOW(), 0)
            ON DUPLICATE KEY UPDATE
                review_date = VALUES(review_date),
                review_count = review_count
        `;
        db.query(reviewQuery, [sentence_id], (err) => {
            if (err) return res.status(500).send(err);

            res.status(201).send({ id: sentence_id, korean_text, english_text, note });
        });
    });
});

// 리뷰 업데이트 API
app.post('/review', (req, res) => {
    const { sentence_id } = req.body;

    // 리뷰 업데이트 쿼리
    const query = `
        UPDATE review
        SET review_date = NOW(), review_count = review_count + 1
        WHERE sentence_id = ?;
    `;

    db.query(query, [sentence_id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: `Review updated successfully: ${sentence_id}` });
    });
});

// 단어 추가 API
app.post('/words', (req, res) => {
    const { word, meaning, note } = req.body;
    const query = 'INSERT INTO words (word, meaning, note) VALUES (?, ?, ?)';

    db.query(query, [word, meaning, note], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, word, meaning, note });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

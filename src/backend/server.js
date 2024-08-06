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
app.get('/sentence', (req, res) => {
    db.query('SELECT * FROM sentence', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 단어 조회 API
app.get('/word', (req, res) => {
    db.query('SELECT * FROM word', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 문장과 리뷰를 함께 조회하는 API

app.get('/sentence-with-review', (req, res) => {
    const query = `
        SELECT s.*, r.*
        FROM sentence s
                 LEFT JOIN review r ON s.id = r.sentence_id
        ORDER BY r.review_date ASC;  /*가장 오래된 복습 날짜가 먼저 오도록. 오름차순*/
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
app.get('/activity', (req, res) => {
    db.query('SELECT * FROM activity', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 문장 추가 API
app.post('/sentence', (req, res) => {
    const { korean_text, english_text, note } = req.body;
    const query = 'INSERT INTO sentence (korean_text, english_text, note) VALUES (?, ?, ?)';

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

// 단어 추가 API
app.post('/word', (req, res) => {
    const { word, meaning, note } = req.body;
    const query = 'INSERT INTO word (word, meaning, note) VALUES (?, ?, ?)';

    db.query(query, [word, meaning, note], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, word, meaning, note });
    });
});

app.post('/activity', (req, res) => {
    const {date, add_count, review_count, level} = req.body; // 수정 필요

    const query = 'INSERT INTO activities (date, add_count, review_count, level) VALUES (?, ?, ?, ?)';
    db.query(query, [date, add_count, review_count, level], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, date, add_count, review_count, level});
    });
})

app.patch('/activity', (req, res) => {
    const {date} = req.body;

    const query = `
        UPDATE activity
        SET review_count = review_count + 1
        WHERE date = ?
    `;

    db.query(query, [date], (err) => {
        if (err) {
            console.error('Error updating activity:', err);
            return res.status(500).send('Error updating activity');
        }
        res.status(200).send({ message: `Activity updated successfully for activity date: ${date}` });
    });
});

app.patch('/sentence/:id', (req, res) => {
    const {id} = req.params;  // 요청 URL 에서 'sentenceId' 추출
    const {note} = req.body; // 요청 바디에서 note 추출

    const query = `
        UPDATE sentence
        SET note = ?
        WHERE id = ?;
    `

    db.query(query, [note, id], (err) => {
        if (err) {
            console.error('Error updating note:', err);
            return res.status(500).send('Error updating note');
        }
        res.status(200).send({ message: `Note updated successfully for sentence ID: ${id}` });
    });
});

// 리뷰 업데이트 API
app.patch('/review', (req, res) => {
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

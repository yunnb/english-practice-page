const express = require('express');
// Express: Node.js 를 위한 빠르고 간단한 웹 프레임 워크
// -> 주로 웹 애플리케이션이나 API 를 쉽게 구축하기 위해 사용
const db = require('./database/db');
const cors = require('cors');
// CORS: 브라우저에서 다른 도메인에서 리소스 요청 시 발생하는 보안 정책
// -> React 앱이 port 3000 에서, API 서버가 3001 에서 실행될 때
// 기본적으로 이를 차단하지만 허용하도록 함

const bodyParser = require('body-parser');
const app = express(); // express 앱 생성
const port = 3001;

app.use(cors());  // CORS 문제 해결
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get: '/' 경로로 GET 요청이 들어왔을 때 실행될 핸들러
// db.query: SQL 쿼리문. 콜백함수는 쿼리 실행 후 호출
app.get('/sentences', (req, res) => {
    db.query('SELECT * FROM sentences', function (err, results) {
        if (err) return res.status(500).send(err);  // 에러 발생 시 500 상태 코드와 에러 메시지 전송
        res.send(results);  // 쿼리 결과를 클라이언트에 보냄
    });
});

app.get('/words', (req, res) => {
    db.query('SELECT * FROM words', function (err, results) {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Reviews 조회 API (Sentences 와 함께 조회)
app.get('/reviews', (req, res) => {
    const query = `
        SELECT r.id, r.user_answer, r.correct, r.review_date, r.review_count, 
               s.korean_text, s.english_text 
        FROM review r
        JOIN sentences s ON r.sentence_id = s.id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Words 삽입 API
app.post('/words', (req, res) => {
    const { word, meaning, note } = req.body;
    const query = 'INSERT INTO words (word, meaning, note) VALUES (?, ?, ?)';
    db.query(query, [word, meaning, note], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, word, meaning, note });
    });
});

// app.listen: 서버를 port 번호에서 시작. 서버 시작 시 메시지를 콘솔에 출력
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

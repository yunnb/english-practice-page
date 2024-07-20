import React, { useState, useEffect } from "react";
import axios from 'axios';
import { WholeStyle } from "../style/WholeStyle";
import { Button1, ButtonWrapper, Textarea } from "../style/Components";

function Writing() {
    const [sentences, setSentences] = useState([]);  // 문장 목록 저장
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // 현재 표시 중인 문장의 인덱스
    const [userAnswer, setUserAnswer] = useState("");  // 사용자 답변
    const [showAnswer, setShowAnswer] = useState(false); // 정답 표시 여부
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        // 병렬로 API 호출
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/sentences-with-reviews');
                console.log('Sentences with Reviews Response:', response.data);

                // 데이터 처리
                const sortedSentences = response.data; // 이미 서버에서 정렬됨
                console.log('Sorted Sentences:', sortedSentences);

                setSentences(sortedSentences);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleTryAgain = () => {
        setShowAnswer(false);
        setUserAnswer('')
    }

    const handleNext = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    };

    const handleCheck = async () => {
        const normalize = (str) => str.toLowerCase().trim().replace(/[‘’]/g, "'");

        const currentSentence = sentences[currentSentenceIndex]
        const user = normalize(userAnswer);
        const answer = normalize(currentSentence.english_text);

        if (user === answer) {
            console.log(`user: ${user}, answer: ${answer} -> is correct.`);
            setIsCorrect(true);
            try {
                const response = await axios.post('http://localhost:3001/review'
                    , {sentence_id: currentSentence.id});

                console.log('Review updated: ', response.data);
            } catch (error) {
                console.error('Error updating review: ', error);
            }
        } else {
            console.log(`user: ${user}, answer: ${answer} -> is not correct.`);
            setIsCorrect(false);
        }

        setShowAnswer(true);
    };

    const handleChange = (e) => {
        setUserAnswer(e.target.value);
    };

    return (
        <WholeStyle>
            <h2>Writing</h2>
            {sentences.length > 0 ? (
                <>
                    <p>{sentences[currentSentenceIndex].korean_text}</p>
                    <Textarea
                        rows='4'
                        placeholder=' '
                        value={userAnswer}
                        onChange={handleChange}
                    />
                    <ButtonWrapper>
                        <Button1 sideMargin onClick={handleTryAgain}>Try again</Button1>
                        <Button1 sideMargin onClick={handleNext}>Next</Button1>
                        <Button1 sideMargin onClick={handleCheck}>Check</Button1>
                    </ButtonWrapper>
                    {showAnswer && (
                        <>
                            {isCorrect ? (<span>Correct answer!</span>) : (<span>Wrong answer!</span>)}
                            <p><b>Correct Answer:</b></p>
                            {sentences[currentSentenceIndex].english_text}
                            <p><b>Note:</b></p> {sentences[currentSentenceIndex].note}
                        </>
                    )}
                </>
            ) : (
                <p>Loading sentences...</p>
            )}
        </WholeStyle>
    );
}

export default Writing;

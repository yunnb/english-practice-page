import React, { useState, useEffect } from "react";
import axios from 'axios';
import { WholeStyle } from "../style/WholeStyle";
import { Button1, ButtonWrapper, Textarea } from "../style/Components";

function Answer({isCorrect, sentence }) {
    const [isEdit, setIsEdit] = useState(true);

    const onClickEditHandler = () => {
        setIsEdit(false);
        console.log('click edit button: ', isEdit);
    };


    return (
        <>
            {isCorrect ? (<span>Correct answer!</span>) : (<span>Wrong answer!</span>)}

            <p><b>Correct Answer:</b></p>
            <Textarea value={sentence.english_text} readOnly={true}
                      style={{
                          userSelect: 'none',          // 모든 브라우저에서 텍스트 선택 비활성화
                          WebkitUserSelect: 'none',    // Chrome, Safari, Opera
                      }}
            />
            <p><b>Note:</b></p>
            <Textarea rows='5' value={sentence.note} readOnly={isEdit}/>

            <Button1 onClick={onClickEditHandler}> {isEdit ? 'Edit' : 'Complete'} </Button1>
        </>
    );
}

function Writing() {
    const [sentences, setSentences] = useState([]);  // 문장 목록 저장
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // 현재 표시 중인 문장의 인덱스
    const [userAnswer, setUserAnswer] = useState("");  // 사용자 답변
    const [showAnswer, setShowAnswer] = useState(false); // 정답 표시 여부
    const [isCorrect, setIsCorrect] = useState(false);  // 정답 여부

    useEffect(() => {
        const fetchData = async () => {
            try {
                // async 와 await 는 주로 비동기 함수 내에서 동기적인 코드를 사용해야 할 때 사용됨
                // async 함수 내에서 await 키워드를 사용하여 비동기 작업의 완료를 기다리고, 이후 코드를 동기적으로 실행 가능
                const response = await axios.get('http://localhost:3001/sentences-with-reviews');
                console.log('Sentences with Reviews Response:', response.data);  // 날짜 기준 오름차순으로 정렬된 데이터

                setSentences(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const onClickTryAgainHandler = () => {
        setShowAnswer(false);
        setUserAnswer('')
    }

    const onClickNextHandler = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setCurrentSentenceIndex(prevIndex => (prevIndex + 1) % sentences.length);
    };

    const onClickCheckHandler = async () => {
        const normalize = (str) => str.toLowerCase().trim().replace(/[‘’]/g, "'");

        const currentSentence = sentences[currentSentenceIndex]
        const user = normalize(userAnswer);
        const answer = normalize(currentSentence.english_text);

        if (user === answer) {
            console.log(`user: ${user}, answer: ${answer} -> is correct.`);
            setIsCorrect(true);
            try {
                const response = await axios.patch('http://localhost:3001/review'
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

    const changeHandler = (e) => {
        setUserAnswer(e.target.value);
    };

    return (
        <WholeStyle>
            <h2>Writing</h2>
            {sentences.length > 0 ? (
                <>
                    <p>{sentences[currentSentenceIndex].id}. {sentences[currentSentenceIndex].korean_text}</p>
                    <Textarea
                        rows='4'
                        placeholder=' '
                        value={userAnswer}
                        onChange={changeHandler}
                    />
                    <ButtonWrapper>
                        <Button1 sideMargin onClick={onClickTryAgainHandler}>Try again</Button1>
                        <Button1 sideMargin onClick={onClickNextHandler}>Next</Button1>
                        <Button1 sideMargin onClick={onClickCheckHandler}>Check</Button1>
                    </ButtonWrapper>
                    {showAnswer &&
                            <Answer isCorrect={isCorrect} sentence={sentences[currentSentenceIndex]}
                            />
                    }
                </>
            ) : (
                <p>Loading sentences...</p>
            )}
        </WholeStyle>
    );
}

export default Writing;

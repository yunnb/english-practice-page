import React, {useState, useEffect, useReducer, useCallback} from "react";
import axios from 'axios';
import styled from "styled-components";
import { WholeStyle } from "../style/WholeStyle";
import { Button1, ButtonWrapper, Textarea } from "../style/Components";

const IsCorrectSpan = styled.span`
    font-weight: bold;
    align-content: center;
    margin-right: auto;

    color: ${props => props.isCorrect ? 'blue' : 'red'}
`;

const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

function Answer({ sentence, onSaveNote }) {
    const [isEditable, setIsEditable] = useState(false);
    const [note, setNote] = useState(sentence.note || '');
    // 첫 번째 truthy 값 찾음. 없으면 마지막 값 반환

    const onClickEditHandler = useCallback(() => {
        if (isEditable) setIsEditable(false);
        else {
            onSaveNote(sentence.id, note);
            setIsEditable(true);
        }
    }, [isEditable, note, onSaveNote, setIsEditable, sentence.id]);

    const getDate = (reviewDate) => {
        return new Date(reviewDate).toLocaleDateString();
    }

    const onChangeHandler = useCallback((e) => {
        setNote(e.target.value);
    }, [setNote]);

    return (
        <AnswerWrapper>
            <p><b>Correct Answer:</b></p>
            <Textarea value={sentence.english_text}/>

            <p><b>Note:</b></p>
            <Textarea
                rows='5'
                value={note}
                readOnly={!isEditable}
                onChange={onChangeHandler}
            />

            <Button1 onClick={onClickEditHandler}> {isEditable ? 'Complete' : 'Edit'} </Button1>
            <span>last review: {getDate(sentence.review_date)} review count: {sentence.review_count}</span>
        </AnswerWrapper>
    );
}

const initialState = {
    sentences: [],  // 데이터베이스에서 가져온 데이터 저장
    currentSentenceIndex: 0,  // 현재 데이터
    userAnswer: '',  // 사용자 답변
    showAnswer: false,  // Check 클릭에 따른 정답 표시 유무
    isCorrect: false,  // 답변 정답 여부
}

const reducer = (state, action) => {
    switch(action.type) { // payload: 상태 업데이트에 필요한 데이터
        case 'SET_SENTENCES':
            return { ...state, sentences: action.payload };
        case 'SET_USER_ANSWER':
            return {...state, userAnswer: action.payload};
        case 'SHOW_ANSWER':
            return {...state, showAnswer: true, isCorrect: action.payload};
        case 'TRY_AGAIN':
            return {...state, showAnswer: false, userAnswer: ''};
        case 'NEXT_SENTENCE':
            return {
                ...state,
                showAnswer: false,
                useAnswer: '',
                currentSentenceIndex: (state.currentSentenceIndex + 1) % state.sentences.length,
            };
        default:
            return state;
    }
}

function Writing() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const currentSentence = state.sentences[state.currentSentenceIndex];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // async 와 await 는 주로 비동기 함수 내에서 동기적인 코드를 사용해야 할 때 사용됨
                // async 함수 내에서 await 키워드를 사용하여 비동기 작업의 완료를 기다리고, 이후 코드를 동기적으로 실행 가능
                const response = await axios.get('http://localhost:3001/sentences-with-reviews');
                dispatch({type: 'SET_SENTENCES', payload: response.data})
            } catch (error) {console.error('Error fetching data: ', error);}
        };
        fetchData();
    }, []);

    const handleTryAgain = () => {
        dispatch({type: 'TRY_AGAIN'});
    }
    const handleNext = () => {
        dispatch({type: 'NEXT_SENTENCE'});
    };

    const setNormalize = (str) => {
        return str.toLowerCase().trim().replace(/[‘’]/g, "'");
    }

    const handleCheck = async () => {
        const user = setNormalize(state.userAnswer);
        const answer = setNormalize(currentSentence.english_text);

        if (user === answer) {
            console.log(`user: ${user}, answer: ${answer} -> is correct.`);
            try {
                const response = await axios.patch('http://localhost:3001/review'
                    , {sentence_id: currentSentence.id});
                dispatch({ type: 'SHOW_ANSWER', payload: true });
                console.log('Review updated: ', response.data);
            } catch (error) {
                console.error('Error updating review: ', error);
            }
        } else {
            console.log(`user: ${user}, answer: ${answer} -> is not correct.`);
            dispatch({ type: 'SHOW_ANSWER', payload: false });
        }

    };

    const handleUserAnswerChange = (e) => {
        dispatch({type: 'SET_USER_ANSWER', payload: e.target.value});
    };

    const handleSaveNote = async (id, note) => {
        try {
            const response = await axios.patch(`http://localhost:3001/sentences/${id}`, {note});
            console.log('Note updated: ', response.data);
        } catch (error) {
            console.error('Error updating note: ', error);
        }
    }

    if (state.sentences.length === 0) {
        return (
            <WholeStyle>
                <p>Loading sentences...</p>
            </WholeStyle>
        );
    }

    return (
        <WholeStyle>
            <h2>Writing</h2>
            <p>{currentSentence.id}. {currentSentence.korean_text}</p>
            <Textarea
                rows='4'
                placeholder=' '
                value={state.userAnswer}
                onChange={handleUserAnswerChange}
            />
            <ButtonWrapper>
                {state.showAnswer &&
                    <IsCorrectSpan isCorrect={state.isCorrect}>{state.isCorrect ? 'Correct answer!' : 'Wrong answer!'}</IsCorrectSpan>
                }
                <Button1 sidemargin onClick={handleTryAgain}>Try again</Button1>
                <Button1 sidemargin onClick={handleNext}>Next</Button1>
                <Button1 sidemargin onClick={handleCheck}>Check</Button1>
            </ButtonWrapper>
            {state.showAnswer && <Answer sentence={currentSentence} onSaveNote={handleSaveNote} />}
        </WholeStyle>
    );
}

export default Writing;

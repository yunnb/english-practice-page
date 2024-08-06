import React, {useState, useEffect, useReducer, useCallback} from "react";
import axios from 'axios';
import styled from "styled-components";
import { WholeStyle } from "../components/WholeStyle";
import { Button1, ButtonWrapper, Textarea } from "../components/Components";

const IsCorrectSpan = styled.span`
    font-weight: bold;
    align-content: center;
    margin-right: auto;

    color: ${({$isCorrect}) => $isCorrect ? 'blue' : 'red'}
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

    const handleEdit = useCallback(() => {
        if (isEditable) {
            setIsEditable(false);
            onSaveNote(sentence.id, note);
        }
        else setIsEditable(true);
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
            <Textarea value={sentence.english_text} readOnly={true}/>

            <p><b>Note:</b></p>
            <Textarea
                rows='10'
                value={note}
                readOnly={!isEditable}
                onChange={onChangeHandler}
            />

            <Button1 onClick={handleEdit}>{isEditable ? 'Complete' : 'Edit'}</Button1>
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
                userAnswer: '',
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
                const response = await axios.get('http://localhost:3001/sentence-with-review');
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
        return str
            .toLowerCase()                                   // 소문자로 변환
            .replace(/[^a-z\s]/g, '')   // 영어 알파벳과 공백을 제외한 모든 문자 제거
            .replace(/\s+/g, ' ')       // 중복된 공백을 단일 공백으로 변환
            .trim();                                         // 앞뒤 공백 제거
       // /[^a-z\s]/g: 소문자(a-z) 또는 공백(\s)를 제외한 모든 문자를 ''으로
       // [^...]: 대괄호 안에 ^가 있으면 그 안에 나열된 문자들을 제외한 모든 문자 매칭
       // /g: g 플래그는 전역 검색을 의미. 문자열의 모든 위치에서 패턴을 찾음
    };

    const handleCheck = async () => {
        const user = setNormalize(state.userAnswer);
        const answer = setNormalize(currentSentence.english_text);

        if (user === answer) {
            console.log(`user: ${user}, answer: ${answer} -> is correct.`);
            try {
                const response = await axios.patch('http://localhost:3001/review',
                    {sentence_id: currentSentence.id});

                dispatch({ type: 'SHOW_ANSWER', payload: true });
                dispatch({
                    type: 'SET_SENTENCES',
                    payload: state.sentences.map(sentence =>
                        sentence.id === currentSentence.id
                            ? {...sentence, review_count: sentence.review_count + 1}
                            : sentence
                    )
                });
                console.log('Review updated: ', response.data);

                // activity
                const today = getToday();
                const response2 = await axios.patch(`http://localhost:3001/activity`,
                    {date: today});
                
                console.log('Activity update: ', response2.data);

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
            const response = await axios.patch(`http://localhost:3001/sentence/${id}`, {note});
            console.log('Note updated: ', response.data);
        } catch (error) {
            console.error('Error updating note: ', error);
        }
    }

    const getToday = useCallback(() => {
        const today = new Date();

        const year = today.getFullYear();
        // padStart(2, '0'): 문자열 길이는 2로 하고 이보다 짧을 때 문자열의 시작 부분부터 0 으로 채움
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    });

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
                rows='2'
                placeholder=' '
                value={state.userAnswer}
                onChange={handleUserAnswerChange}
            />
            <ButtonWrapper>
                {state.showAnswer &&
                    <IsCorrectSpan $isCorrect={state.isCorrect}>{state.isCorrect ? 'Correct answer!' : 'Wrong answer!'}</IsCorrectSpan>
                }
                <Button1 $sideMargin onClick={handleCheck}>Check</Button1>
                <Button1 $sideMargin onClick={handleTryAgain}>Try again</Button1>
                <Button1 $sideMargin onClick={handleNext}>Next</Button1>
            </ButtonWrapper>
            {state.showAnswer && <Answer sentence={currentSentence} onSaveNote={handleSaveNote} />}
        </WholeStyle>
    );
}

export default Writing;

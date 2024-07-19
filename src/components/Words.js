import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {Button1, ButtonWrapper, Table} from "../style/Components";
import {useNavigate} from "react-router-dom";
import {WholeStyle} from "../style/WholeStyle";

function Word({word}) {
    const onDoubleClick = (e => {
        console.log(e.target);

    });
    return (
        <>
            <tr id='underline' onDoubleClick={onDoubleClick}>
                <td id='id'>{word.id}</td>
                <td>{word.word}</td>
                <td>{word.meaning}</td>
            </tr>
        </>
    );
}

function Words() {
    const navigate = useNavigate();
    const [words, setWords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/words')
            .then(response => {
                console.log(response.data);
                setWords(response.data);
            })
            .catch(error => {
                console.error('Error fetching words: ', error);
            })
    }, []);

    return (
        <WholeStyle>
            <h2>Words</h2>
            <ButtonWrapper>
                <Button1 onClick={() => navigate('/add-word')}>Add word</Button1>
            </ButtonWrapper>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Word</th>
                    <th>Meaning</th>
                </tr>
                </thead>
                <tbody>
                {words.map(words => (
                    <Word word={words} />
                ))}
                </tbody>
            </Table>
        </WholeStyle>
    );
};

export default Words;
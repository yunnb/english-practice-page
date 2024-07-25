import React, {useState, useEffect} from "react";
import axios from "axios";
import {Button1, ButtonWrapper, Table} from "../components/Components";
import {useNavigate} from "react-router-dom";
import {WholeStyle} from "../components/WholeStyle";

function Word({word}) {

    const handleDoubleClick = (e) => {
        console.log(e.target);
    }

    return (
        <>
            <tr className='underline' onDoubleClick={handleDoubleClick}>
                <td className='id'>{word.id}</td>
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
        axios.get('http://localhost:3001/word')
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
                {words.map(word => (
                    <Word key={word.id} word={word} />
                ))}
                </tbody>
            </Table>
        </WholeStyle>
    );
};

export default Words;
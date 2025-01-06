import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button1} from "../components/Components";
import {useNavigate} from "react-router-dom";
import {Container, Header} from "../styles/WholeStyle";
import CardItem from "../components/CardItem";

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
        <Container>
            <Header>
                <h2>Words</h2>
                <Button1 onClick={() => navigate('/add-word')}>단어 추가</Button1>
            </Header>
            {words.map(word => (
                <CardItem data={word} type="word"/>
            ))}
        </Container>
    );
};

export default Words;
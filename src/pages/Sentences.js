import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button1} from "../components/Components";
import CardItem from "../components/CardItem";
import {Container, Header} from "../styles/WholeStyle";
import {useNavigate} from "react-router-dom";

function Sentences() {
    const navigate = useNavigate();
    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/sentence')
            .then(response => {
                console.log(response.data);
                setSentences(response.data);
            })
            .catch(error => {
                console.error('Error fetching sentences: ', error);
            });
    }, []);

    return (
        <Container>
            <Header>
                <h2>Sentences</h2>
                <Button1 onClick={() => navigate('/add-sentence')}>문장 추가</Button1>
            </Header>
            {sentences.map(sentence => (
                <CardItem data={sentence} type="sentence"/>
            ))}
        </Container>
    );
}

export default Sentences;

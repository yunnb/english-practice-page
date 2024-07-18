import React , {useState, useEffect} from "react";
import axios from 'axios';
import {WholeStyle} from "../style/WholeStyle";
import {Button1, ButtonWrapper, Textarea} from "../style/Components";

function Writing() {
    const [sentences, setSentences] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/sentences')
            .then(response => {
                console.log(response.data);
                setSentences(response.data);
            })
            .catch(error => {
                console.error('Error fetching sentences: ', error);
            });
    }, []);


    return (
        <WholeStyle>
            <h2>Writing</h2>
            <p>날씨가 궂을 경우 프로그램이 열리는지를 확인하려면 도서관으로 전화하세요.</p>
            <Textarea rows='4' placeholder=' '></Textarea>
            <ButtonWrapper>
                <Button1 sideMargin>Try again</Button1>
                <Button1 sideMargin>Next</Button1>
                <Button1 sideMargin>Check</Button1>
            </ButtonWrapper>
            <p>
                In the event of inclement weather, please call the library to confirm that the program will be held.
            </p>
        </WholeStyle>
    );
};

export default Writing;

import React from "react";
import {Button1} from "../style/Textarea";
import {useNavigate} from "react-router-dom";
import {WholeStyle} from "../style/WholeStyle";

function Words() {
    const navigate = useNavigate();
    return (
        <WholeStyle>
            <h2>Words</h2>
            <Button1 onClick={() => navigate('/add-word')}>Add word</Button1>
            <table border=''>
                <tr><th>word</th><th>meaning</th></tr>
                <tr><td>word1</td><td>뜻1</td></tr>
            </table>
        </WholeStyle>
    );
};

export default Words;
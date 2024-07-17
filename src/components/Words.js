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
        </WholeStyle>
    );
};

export default Words;
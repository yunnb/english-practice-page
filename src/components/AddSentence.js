import React from "react";
import {Textarea, InputWrapper, Button1} from "../style/Textarea";
import {WholeStyle} from "../style/WholeStyle";

function AddSentence() {

    return (
        <WholeStyle>
            <InputWrapper>
                <h2>Add new sentence</h2>
                <Textarea
                    rows='3'
                    placeholder="Enter an example sentence in Korean."/>
                <Textarea
                    rows='3'
                    placeholder="Enter the English answer."/>
                <Textarea
                    rows='6'
                    placeholder="Enter what you learned."
                />
                <Button1>Add</Button1>
            </InputWrapper>
        </WholeStyle>
    );
}

export default AddSentence;


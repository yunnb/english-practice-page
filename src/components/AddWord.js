import React from "react";
import {Button1, InputWrapper, Textarea} from "../style/Textarea";
import {WholeStyle} from "../style/WholeStyle";

function AddWord() {

    return (
        <WholeStyle>
            <InputWrapper>
                <h2>Add new vocabulary</h2>
                <Textarea
                    rows='1'
                    placeholder="Enter an English word."/>
                <Textarea
                    rows='1'
                    placeholder="Enter the meaning of the English word."/>
                <Button1>Add</Button1>
            </InputWrapper>
        </WholeStyle>
    );

}

export default AddWord;
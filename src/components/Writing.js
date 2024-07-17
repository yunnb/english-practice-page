import React from "react";
import {WholeStyle} from "../style/WholeStyle";
import {Button1, Textarea} from "../style/Textarea";

function Writing() {

    return (
        <WholeStyle>
            <h2>Writing</h2>
            <p>an example sentence in Korean</p>
            <Textarea rows='4' placeholder=''> </Textarea>
            <Button1>Check</Button1>
            <div>
                Answer is here.
            </div>
        </WholeStyle>
    );
};

export default Writing;

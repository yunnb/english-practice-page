import React from "react";
import styled from "styled-components";
import {WholeStyle} from "../style/WholeStyle";
import {Button1, Textarea} from "../style/Textarea";

function Writing() {

    return (
        <WholeStyle>
            <h2>Writing</h2>
            <p>날씨가 궂을 경우 프로그램이 열리는지를 확인하려면 도서관으로 전화하세요.</p>
            <Textarea rows='4' placeholder=''> </Textarea>
            <Button1>Check</Button1>
            <p>
                In the event of inclement weather, please call the library to confirm that the program will be held.
            </p>
        </WholeStyle>
    );
};

export default Writing;

import React from "react";
import {useNavigate} from "react-router-dom";
import {InputWrapper} from "../components/Components";
import {WholeStyle} from "../components/WholeStyle";
import styled from "styled-components";

export const MenuButton = styled.button`
    height: 60px;
    margin: 5px 0;
    
    color: seagreen;
    background-color: transparent;
    font-size: 1em;
    
    border: 1px solid seagreen;
    border-radius: 5px;
`;

function Home() {
    const navigate = useNavigate();

    return (
        <WholeStyle>
            <InputWrapper>
                <h1> </h1>
                <MenuButton onClick={() => navigate('/writing')}>✒️ Writing</MenuButton>
                <MenuButton onClick={() => navigate('/words')}>📖 Words</MenuButton>
                <MenuButton onClick={() => navigate('/sentences')}>📖 Sentences</MenuButton>
                <MenuButton onClick={() => navigate('/add-sentence')}>➕ Add Sentence</MenuButton>
            </InputWrapper>
        </WholeStyle>
    );
}

export default Home;

import React from "react";
import {InputWrapper} from "../style/Textarea";
import {MenuButton} from "../style/Menu";
import { useNavigate } from "react-router-dom";
import {WholeStyle} from "../style/WholeStyle";

function Home() {
    const navigate = useNavigate();

    return (
        <WholeStyle>
            <InputWrapper>
                <MenuButton onClick={() => navigate('/writing')}>✒️ Writing</MenuButton>
                <MenuButton onClick={() => navigate('/words')}>📖 Words</MenuButton>
                <MenuButton onClick={() => navigate('/add-sentence')}>➕ Add Sentence</MenuButton>
            </InputWrapper>
        </WholeStyle>
    );
}

export default Home;

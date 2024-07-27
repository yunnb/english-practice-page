import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 55px;
    
    top: 0;
    left: 0;
    
    padding: 10px;
    color: white;
    background-color: darkseagreen;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    position: absolute;
    left: 50%;
    transform: translateX(-55%);
    margin: 0;
    font-size: 24px;
`;

const BackButton = styled.button`
    font-size: 24px;
    border: none;
    background-color: transparent;
`;


function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <HeaderContainer>
            {location.pathname !== '/' && (
                <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
            )}
            <Title>English</Title>
        </HeaderContainer>
    );
}


export default Header;

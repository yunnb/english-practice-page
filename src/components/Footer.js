import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 55px;
    bottom: 0;
    padding: 10px;
    background-color: white;
    box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled.button`
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: transparent;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const Footer = () => {
    const menus = [
        {name: "📖 단어장", link: "/words"},
        {name: "✒️ 영작 연습", link: "/writing"},
        {name: "📚 학습 문장", link: "/sentences"},
    ];

    // 페이지 이동 함수
    const handleNavigation = (path) => {
        window.location.href = path;
        // 또는 history.pushState() 사용 가능
    };

    return (
        <FooterContainer>
            {menus.map((menu, index) => (
                <MenuButton
                    key={index}
                    onClick={() => handleNavigation(menu.link)}
                >
                    {menu.name}
                </MenuButton>
            ))}
        </FooterContainer>
    );
};

export default Footer;
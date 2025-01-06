import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
    background: white;
    border-radius: 12px;
    padding: 25px 20px;
    margin: 0 auto 20px auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Id = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #eaf6ff;
    color: #2969aa;
    font-weight: 600;
    flex-shrink: 0;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const KoreanText = styled.span`
    font-size: 18px;
`;

export const EnglishText = styled.span`
    color: gray;
`;

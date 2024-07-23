import styled from 'styled-components';


export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    border-radius: 10px; 
    
`;
export const Textarea = styled.textarea`
    font-size: 1em;

    border-radius: 7px;
    border: 1px solid seagreen;

    margin-bottom: 10px;
    padding: 10px;

    resize: none;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
`;


export const Button1 = styled.button.attrs(props => ({
    // attr: 기본 HTML 속성 설정. props 필터링, 조건부 속성 설정 시 사용
    // sidemargin 속성은 DOM에 전달되지 않도록 설정
    sidemargin: undefined,
}))`
    width: 120px;
    height: 35px;

    border: none;
    border-radius: 7px;

    color: white;
    background-color: darkseagreen;

    margin-left: auto;

    ${({ sidemargin }) => sidemargin && `
      margin-left: 10px; 
  `}
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th {
        border-bottom: 1px solid seagreen;
        padding: 10px;
    }

    td {
        padding: 5px;
    }

    #id {
        text-align: center;
    }

    #underline {
        border-bottom: 1px dashed darkseagreen;
    }
`;
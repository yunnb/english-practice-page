import styled from 'styled-components'


export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    border-radius: 10px; 
    
`;
export const Textarea = styled.textarea`
    font-family: Arial;
    font-size: 1em;

    border-radius: 7px;
    border: 1px solid seagreen;
    
    margin-bottom: 10px;
    padding: 10px;

    resize: none;
`;

export const Button1 = styled.button`
    width: 120px;
    height: 35px;

    border: none;
    border-radius: 7px;
    
    color: white;
    background-color: darkseagreen;

    margin-top: 3px;
    margin-left: auto;
`;
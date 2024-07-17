import styled from 'styled-components'


export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    border-radius: 10px; 
    
`;
export const Textarea = styled.textarea`
    font-family: Arial;
    font-size: 1em;

    box-shadow: 0 1px 7px gray;
    border-radius: 10px;
    border: none;
    
    margin-bottom: 10px;
    padding: 10px;

    resize: none;
`;

export const Button1 = styled.button`
    width: 120px;
    height: 30px;

    box-shadow: 0 1px 5px gray;
    border-radius: 10px;
    border: none;
  
    margin-top: 3px;
    margin-left: auto;
`;
import React, {useCallback, useState} from "react";
import axios from "axios";
import {Button1, InputWrapper, Textarea} from "../components/Components";
import {Container} from "../styles/CommonStyle";

function AddWord() {
    const [inputs, setInputs] = useState({
        word: '',
        meaning: '',
        note: '',
    });

    const {word, meaning, note} = inputs;

    const onChange = useCallback(e => {
        const {name, value} = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    }, [inputs]);
    const handleAddButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/word', inputs);
            console.log('Word added: ', response.data);

            setInputs({
                word: '',
                meaning: '',
                note: '',
            })

            alert('단어가 추가되었습니다!');
        } catch (error) {
            console.error('Error adding word: ', error);
        }
    };
    return (
        <Container>
            <InputWrapper>
                <h2>Add new vocabulary</h2>
                <Textarea
                    name='word'
                    value={word}
                    rows='1'
                    placeholder="Enter an English word."
                    onChange={onChange}
                />
                <Textarea
                    name='meaning'
                    value={meaning}
                    rows='1'
                    placeholder="Enter the meaning of the English word."
                    onChange={onChange}
                />
                <Textarea
                    name='note'
                    value={note}
                    rows='3'
                    placeholder="Enter what you learned."
                    onChange={onChange}
                />
                <Button1 onClick={handleAddButton}>Add</Button1>
            </InputWrapper>
        </Container>
    );

}

export default AddWord;
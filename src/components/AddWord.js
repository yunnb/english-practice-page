import React, {useState, useCallback} from "react";
import axios from "axios";
import {Button1, InputWrapper, Textarea} from "../style/Components";
import {WholeStyle} from "../style/WholeStyle";

function AddWord() {
    const [inputs, setInputs] = useState({
        word: '',
        meaning: '',
        note: '',
    });

    // 해당 textarea 만 렌더링되도록 최적화 필요
    const onChange = useCallback(e => {
        const {name, value} = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    }, [inputs]);

    const handleAddButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/words', inputs);
            console.log('Word added: ', response.data);

            setInputs({
                word: '',
                meaning: '',
                note: '',
            })
        } catch (error) {console.error('Error adding word: ', error);}

    };

    const {word, meaning, note} = inputs;
    return (
        <WholeStyle>
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
        </WholeStyle>
    );

}

export default AddWord;
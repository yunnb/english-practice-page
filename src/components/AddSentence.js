import React, { useCallback, useState } from "react";
import axios from "axios";
import { Textarea, InputWrapper, Button1 } from "../style/Components";
import { WholeStyle } from "../style/WholeStyle";

function AddSentence() {
    const [inputs, setInputs] = useState({
        korean_text: '',
        english_text: '',
        note: '',
    });

    const { korean_text, english_text, note } = inputs;

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }, [inputs]);

    const handleAddButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/sentences', inputs);
            console.log('Sentence added: ', response.data);

            setInputs({
                korean_text: '',
                english_text: '',
                note: '',
            });
        } catch (error) {
            console.error('Error adding sentences: ', error);
        }
    };

    return (
        <WholeStyle>
            <InputWrapper>
                <h2>Add new sentence</h2>
                <Textarea
                    name='korean_text'
                    value={korean_text}
                    rows='3'
                    placeholder="Enter an example sentence in Korean."
                    onChange={onChange}
                />
                <Textarea
                    name='english_text'
                    value={english_text}
                    rows='3'
                    placeholder="Enter the English answer."
                    onChange={onChange}
                />
                <Textarea
                    name='note'
                    value={note}
                    rows='6'
                    placeholder="Enter what you learned."
                    onChange={onChange}
                />
                <Button1 onClick={handleAddButton}>Add</Button1>
            </InputWrapper>
        </WholeStyle>
    );
}

export default AddSentence;

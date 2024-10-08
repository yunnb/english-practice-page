import React, { useState, useEffect } from "react";
import axios from "axios";
import { WholeStyle } from "../components/WholeStyle";
import {Table} from "../components/Components";

function Sentences() {
    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/sentence')
            .then(response => {
                console.log(response.data);
                setSentences(response.data);
            })
            .catch(error => {
                console.error('Error fetching sentences: ', error);
            });
    }, []);

    return (
        <WholeStyle>
            <h2>Sentences</h2>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                </tr>
                </thead>
                <tbody>
                {sentences.map(sentence => (
                    <React.Fragment key={sentence.id}>
                        <tr>
                            <td rowSpan="2" id='id'>{sentence.id}</td>
                            <td>{sentence.korean_text}</td>
                        </tr>
                        <tr className='underline'>
                            <td>{sentence.english_text}</td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </Table>
        </WholeStyle>
    );
}

export default Sentences;
